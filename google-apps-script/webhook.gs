/**
 * NexusYou Progress Tracker — Google Apps Script
 *
 * Setup:
 * 1. Go to script.google.com and create a new project
 * 2. Paste this code
 * 3. Run initializeSheets() once to set up the spreadsheet
 * 4. Deploy > New Deployment > Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the deployment URL and paste into your .env as VITE_GOOGLE_WEBHOOK_URL
 *
 * The script creates three sheets:
 *   - Registrations: One row per new user registration
 *   - Progress: One row per exercise completion
 *   - Summary: Auto-calculated overview stats
 */

// ─── Entry point for POST requests ───────────────────────────────────────────
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents)

    switch (data.action) {
      case 'registration':
        handleRegistration(data)
        break
      case 'progress_update':
        handleProgressUpdate(data)
        break
      case 'certification':
        handleCertification(data)
        break
      default:
        Logger.log('Unknown action: ' + data.action)
    }

    updateSummary()

    return ContentService.createTextOutput(
      JSON.stringify({ status: 'ok', action: data.action })
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    Logger.log('Error: ' + err.message)
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: err.message })
    ).setMimeType(ContentService.MimeType.JSON)
  }
}

// Allow GET for connectivity testing
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'ok', message: 'NexusYou webhook is running' })
  ).setMimeType(ContentService.MimeType.JSON)
}

// ─── Registration Handler ─────────────────────────────────────────────────────
function handleRegistration(data) {
  var sheet = getOrCreateSheet('Registrations', [
    'Timestamp', 'Name', 'Email', 'Role', 'Buddy', 'Registered At'
  ])

  sheet.appendRow([
    new Date(),
    data.user_name || '',
    data.user_email || '',
    data.user_role || '',
    data.buddy_name || '',
    data.timestamp || new Date().toISOString()
  ])
}

// ─── Progress Update Handler ──────────────────────────────────────────────────
function handleProgressUpdate(data) {
  var sheet = getOrCreateSheet('Progress', [
    'Timestamp', 'Name', 'Email', 'Role', 'Level', 'Exercise ID',
    'Exercise Title', 'Status', 'Self Rating', 'Buddy', 'Event Timestamp'
  ])

  sheet.appendRow([
    new Date(),
    data.user_name || '',
    data.user_email || '',
    data.user_role || '',
    data.level || '',
    data.exercise || '',
    data.exercise_title || '',
    data.status || 'completed',
    data.self_rating || '',
    data.buddy_name || '',
    data.timestamp || new Date().toISOString()
  ])
}

// ─── Certification Handler ────────────────────────────────────────────────────
function handleCertification(data) {
  // Record as a special progress entry
  var sheet = getOrCreateSheet('Progress', [
    'Timestamp', 'Name', 'Email', 'Role', 'Level', 'Exercise ID',
    'Exercise Title', 'Status', 'Self Rating', 'Buddy', 'Event Timestamp'
  ])

  sheet.appendRow([
    new Date(),
    data.user_name || '',
    data.user_email || '',
    data.user_role || '',
    'ALL',
    'CERTIFICATION',
    'NexusYou Certification Complete',
    'certified',
    '',
    '',
    data.completed_at || new Date().toISOString()
  ])

  // Also record estimated time
  var certSheet = getOrCreateSheet('Certifications', [
    'Timestamp', 'Name', 'Email', 'Role', 'Completed At', 'Time Estimate'
  ])

  certSheet.appendRow([
    new Date(),
    data.user_name || '',
    data.user_email || '',
    data.user_role || '',
    data.completed_at || new Date().toISOString(),
    data.total_time_estimate || ''
  ])
}

// ─── Summary Sheet ────────────────────────────────────────────────────────────
function updateSummary() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var summary = ss.getSheetByName('Summary')
  if (!summary) {
    summary = ss.insertSheet('Summary')
  }
  summary.clearContents()

  var registrations = ss.getSheetByName('Registrations')
  var progress = ss.getSheetByName('Progress')
  var certifications = ss.getSheetByName('Certifications')

  var totalRegistered = registrations ? Math.max(0, registrations.getLastRow() - 1) : 0
  var totalCertified = certifications ? Math.max(0, certifications.getLastRow() - 1) : 0
  var totalExercises = progress ? Math.max(0, progress.getLastRow() - 1) : 0

  // Summary header
  summary.getRange(1, 1, 1, 2).setValues([['NexusYou Progress Summary', 'Last Updated: ' + new Date().toLocaleString()]])
  summary.getRange(1, 1, 1, 2).setFontWeight('bold')
  summary.getRange(1, 1, 1, 2).setBackground('#3bc1cc')
  summary.getRange(1, 1, 1, 2).setFontColor('#ffffff')

  // Stats
  var stats = [
    ['', ''],
    ['Total Registered', totalRegistered],
    ['Total Certified', totalCertified],
    ['Certification Rate', totalRegistered > 0 ? ((totalCertified / totalRegistered) * 100).toFixed(1) + '%' : '0%'],
    ['Total Exercises Completed', totalExercises],
    ['', ''],
    ['COMPLETION BY LEVEL', ''],
  ]

  // Level completion stats
  if (progress && progress.getLastRow() > 1) {
    var progressData = progress.getRange(2, 1, progress.getLastRow() - 1, progress.getLastColumn()).getValues()
    var levelCounts = {}
    var levelNames = {
      1: 'Level 1: Part-Time Hustle',
      2: 'Level 2: The Host',
      3: 'Level 3: Small Portfolio',
      4: 'Level 4: Large Portfolio',
      5: 'Level 5: Property Manager',
      6: 'Level 6: Destination Definer',
    }

    progressData.forEach(function(row) {
      var levelId = row[4]
      if (levelId && levelId !== 'ALL' && !isNaN(parseInt(levelId))) {
        levelCounts[levelId] = (levelCounts[levelId] || 0) + 1
      }
    })

    for (var i = 1; i <= 6; i++) {
      stats.push([levelNames[i] || 'Level ' + i, levelCounts[i] || 0])
    }
  }

  // Role breakdown
  if (registrations && registrations.getLastRow() > 1) {
    var regData = registrations.getRange(2, 1, registrations.getLastRow() - 1, 4).getValues()
    var roleCounts = {}
    regData.forEach(function(row) {
      var role = row[3]
      if (role) {
        roleCounts[role] = (roleCounts[role] || 0) + 1
      }
    })

    stats.push(['', ''])
    stats.push(['BY ROLE', ''])
    Object.keys(roleCounts).sort().forEach(function(role) {
      stats.push([role, roleCounts[role]])
    })
  }

  if (stats.length > 0) {
    summary.getRange(2, 1, stats.length, 2).setValues(stats)
  }

  // Format
  summary.getRange('A:A').setFontWeight('normal')
  summary.getRange('A7').setFontWeight('bold')
  summary.autoResizeColumns(1, 2)
}

// ─── Sheet Helper ─────────────────────────────────────────────────────────────
function getOrCreateSheet(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheetByName(name)

  if (!sheet) {
    sheet = ss.insertSheet(name)
    // Add headers
    sheet.appendRow(headers)
    // Style the header row
    var headerRange = sheet.getRange(1, 1, 1, headers.length)
    headerRange.setBackground('#252f38')
    headerRange.setFontColor('#ffffff')
    headerRange.setFontWeight('bold')
    sheet.setFrozenRows(1)
  }

  return sheet
}

// ─── One-time initialization ──────────────────────────────────────────────────
// Run this once after pasting the code to set up sheets
function initializeSheets() {
  getOrCreateSheet('Registrations', [
    'Timestamp', 'Name', 'Email', 'Role', 'Buddy', 'Registered At'
  ])
  getOrCreateSheet('Progress', [
    'Timestamp', 'Name', 'Email', 'Role', 'Level', 'Exercise ID',
    'Exercise Title', 'Status', 'Self Rating', 'Buddy', 'Event Timestamp'
  ])
  getOrCreateSheet('Certifications', [
    'Timestamp', 'Name', 'Email', 'Role', 'Completed At', 'Time Estimate'
  ])
  updateSummary()

  Logger.log('NexusYou sheets initialized successfully!')
}
