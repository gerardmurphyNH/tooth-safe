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
      case 'level_completed':
        handleLevelCompletion(data)
        break
      case 'exercise_feedback':
        handleExerciseFeedback(data)
        break
      case 'signal':
        handleSignal(data)
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

// ─── Level Completion Handler ─────────────────────────────────────────────────
function handleLevelCompletion(data) {
  var sheet = getOrCreateSheet('Level Completions', [
    'Timestamp', 'Name', 'Email', 'Role', 'Level', 'Level Title', 'MC Score', 'Completed At'
  ])

  sheet.appendRow([
    new Date(),
    data.user_name || '',
    data.user_email || '',
    data.user_role || '',
    data.level || '',
    data.level_title || '',
    data.mc_score || '',
    data.timestamp || new Date().toISOString()
  ])
}

// ─── Exercise Feedback Handler ────────────────────────────────────────────────
function handleExerciseFeedback(data) {
  var sheet = getOrCreateSheet('Feedback', [
    'Timestamp', 'Name', 'Email', 'Role', 'Level', 'Exercise',
    'Exercise Title', 'Confidence (1-5)', 'Useful (Y/N)', 'Comment'
  ])

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.user_name || '',
    data.user_email || '',
    data.user_role || '',
    data.level || '',
    data.exercise || '',
    data.exercise_title || '',
    data.confidence_rating || '',
    data.useful === true ? 'Y' : data.useful === false ? 'N' : '',
    data.comment || ''
  ])
}

// ─── Signal Handler ───────────────────────────────────────────────────────────
function handleSignal(data) {
  var sheet = getOrCreateSheet('Signals', [
    'Timestamp', 'Name', 'Email', 'Role', 'Type', 'Location', 'Level', 'Message'
  ])

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.user_name || '',
    data.user_email || '',
    data.user_role || '',
    data.signal_type || '',
    data.location || '',
    data.level || '',
    data.message || ''
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
  var levelCompletions = ss.getSheetByName('Level Completions')

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

  // Per-user last level completed
  stats.push(['', ''])
  stats.push(['LAST MODULE COMPLETED PER USER', ''])

  if (levelCompletions && levelCompletions.getLastRow() > 1) {
    var lcData = levelCompletions.getRange(2, 1, levelCompletions.getLastRow() - 1, levelCompletions.getLastColumn()).getValues()
    // Build map of email → { name, role, maxLevel, levelTitle, completedAt }
    var userLastLevel = {}
    lcData.forEach(function(row) {
      // cols: Timestamp(0), Name(1), Email(2), Role(3), Level(4), LevelTitle(5), MCScore(6), CompletedAt(7)
      var email = row[2]
      var levelNum = parseInt(row[4])
      if (!email || isNaN(levelNum)) return
      if (!userLastLevel[email] || levelNum > userLastLevel[email].level) {
        userLastLevel[email] = {
          name: row[1],
          role: row[3],
          level: levelNum,
          levelTitle: row[5],
          completedAt: row[7]
        }
      }
    })

    var sortedUsers = Object.keys(userLastLevel).sort(function(a, b) {
      return userLastLevel[b].level - userLastLevel[a].level
    })

    if (sortedUsers.length === 0) {
      stats.push(['No level completions yet', ''])
    } else {
      sortedUsers.forEach(function(email) {
        var u = userLastLevel[email]
        var completedDate = u.completedAt ? new Date(u.completedAt).toLocaleDateString() : ''
        stats.push([u.name + ' (' + u.role + ')', 'Level ' + u.level + ' — ' + u.levelTitle + (completedDate ? ' · ' + completedDate : '')])
      })
    }
  } else {
    stats.push(['No level completions yet', ''])
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

  // ─── Feedback Analytics ───────────────────────────────────────────────────
  var feedbackSheet = ss.getSheetByName('Feedback')
  if (feedbackSheet && feedbackSheet.getLastRow() > 1) {
    var fbData = feedbackSheet.getRange(2, 1, feedbackSheet.getLastRow() - 1, 10).getValues()

    stats.push(['', ''])
    stats.push(['FEEDBACK ANALYTICS', ''])

    // Average confidence by level
    stats.push(['Avg Confidence by Level', ''])
    for (var lvl = 1; lvl <= 6; lvl++) {
      var lvlConf = fbData
        .filter(function(f) { return String(f[4]) === String(lvl) && f[7] !== '' })
        .map(function(f) { return Number(f[7]) })
        .filter(function(r) { return !isNaN(r) && r > 0 })
      var avgConf = lvlConf.length > 0
        ? (lvlConf.reduce(function(a, b) { return a + b }, 0) / lvlConf.length).toFixed(1) + ' (' + lvlConf.length + ' ratings)'
        : 'N/A'
      stats.push(['  Level ' + lvl, avgConf])
    }

    // % useful by level
    stats.push(['', ''])
    stats.push(['% Found Useful by Level', ''])
    for (var lvl = 1; lvl <= 6; lvl++) {
      var lvlFb = fbData.filter(function(f) { return String(f[4]) === String(lvl) && f[8] !== '' })
      var usefulCt = lvlFb.filter(function(f) { return f[8] === 'Y' }).length
      var pct = lvlFb.length > 0
        ? Math.round((usefulCt / lvlFb.length) * 100) + '% (' + lvlFb.length + ' votes)'
        : 'N/A'
      stats.push(['  Level ' + lvl, pct])
    }

    // Bottom 5 exercises by confidence
    var exerciseConf = {}
    fbData.forEach(function(f) {
      var exKey = 'L' + f[4] + ' ' + f[5]
      if (f[7] !== '') {
        if (!exerciseConf[exKey]) exerciseConf[exKey] = []
        exerciseConf[exKey].push(Number(f[7]))
      }
    })
    var exerciseAvgs = Object.keys(exerciseConf).map(function(k) {
      var vals = exerciseConf[k]
      return { ex: k, avg: vals.reduce(function(a,b){return a+b},0)/vals.length }
    }).sort(function(a,b){ return a.avg - b.avg }).slice(0, 5)
    if (exerciseAvgs.length > 0) {
      stats.push(['', ''])
      stats.push(['Lowest Confidence Exercises', ''])
      exerciseAvgs.forEach(function(e) {
        stats.push(['  ' + e.ex, e.avg.toFixed(1)])
      })
    }

    // Recent comments (last 10)
    var comments = fbData
      .filter(function(f) { return f[9] && f[9].toString().trim() !== '' })
      .slice(-10).reverse()
    if (comments.length > 0) {
      stats.push(['', ''])
      stats.push(['Recent Comments', ''])
      comments.forEach(function(c) {
        stats.push([c[1] + ' · L' + c[4] + ' ' + c[5], c[9]])
      })
    }
  }

  // ─── Signals Summary ──────────────────────────────────────────────────────
  var signalsSheet = ss.getSheetByName('Signals')
  if (signalsSheet && signalsSheet.getLastRow() > 1) {
    var sigData = signalsSheet.getRange(2, 1, signalsSheet.getLastRow() - 1, 8).getValues()
    var bugCt = sigData.filter(function(s){ return s[4] === 'bug' }).length
    var fbCt = sigData.filter(function(s){ return s[4] === 'feedback' }).length
    var beerCt = sigData.filter(function(s){ return s[4] === 'beer' }).length
    stats.push(['', ''])
    stats.push(['SIGNALS RECEIVED', ''])
    stats.push(['🐛 Bug Reports', bugCt])
    stats.push(['💡 Feedback', fbCt])
    stats.push(['🍺 Virtual Beers', beerCt])
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
  getOrCreateSheet('Level Completions', [
    'Timestamp', 'Name', 'Email', 'Role', 'Level', 'Level Title', 'MC Score', 'Completed At'
  ])
  getOrCreateSheet('Feedback', [
    'Timestamp', 'Name', 'Email', 'Role', 'Level', 'Exercise',
    'Exercise Title', 'Confidence (1-5)', 'Useful (Y/N)', 'Comment'
  ])
  getOrCreateSheet('Signals', [
    'Timestamp', 'Name', 'Email', 'Role', 'Type', 'Location', 'Level', 'Message'
  ])
  updateSummary()

  Logger.log('NexusYou sheets initialized successfully!')
}
