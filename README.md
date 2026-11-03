# Forge PWA: publish on GitHub Pages

1. Create a GitHub repo and upload everything in this folder to its root (`index.html`, `sw.js`, `manifest.webmanifest`, the three icons, and the `fonts/` folder).
2. In Repo Settings > Pages, choose Deploy from branch > `main` > `/ (root)`. Wait for the site to publish.
3. Open the published URL on your phone. Android Chrome: menu > Install app. iPhone Safari: Share > Add to Home Screen.

## Data and offline use

- Training data is stored in browser storage for this exact site URL. Keep using the same URL and create backups in Progress > Data before replacing the site or changing its address.
- Progress photos stay in separate on-device storage and are not included in the text backup.
- Once the app has loaded online and the service worker has installed, the app shell and icons are cached for offline use. A first visit still needs a connection.
- Forge Coach is available from a floating button on Today, Week, and Progress. It proactively surfaces training guidance from your logged sessions, set effort, readiness, skipped days, lift trends, and measurements. It uses on-device rules; it is not a question-and-answer bot or an external AI service.
- Load suggestions use recent comparable sessions, wait for repeatable evidence before increasing or reducing weight, and show how confident the rule is. A lighter week is suggested only when declining performance lines up with other recovery signals.
- During and between sessions, Forge uses logged reps in reserve to shape targets: it avoids adding reps after a failure set, can lower the next set load or rep target, and can add one rep after a clearly easy set. After a long break it restarts near the bottom of the range. A chosen low-energy day or active recovery week suppresses otherwise-earned load increases for that day.
- The weekly volume view shows both logged effective sets and the full plan’s totals against Forge’s starting bands. Those bands are heuristics, not individualized medical or coaching targets.
- Today and Week let you swap a planned movement for a same-muscle exercise in its movement family. Choices are saved by day; each movement keeps its own load history.
- Choose an approximate 25, 45, 60, or 75-minute session. Forge selects from that day’s plan, prioritizing muscle groups with the largest remaining volume gaps. Short sessions count as partial sessions.
- Progress includes recent set-by-set exercise history and Forge’s current load suggestion. The half-kneeling glute hold is logged in seconds. Each exercise demo shows its working muscles (red) and a green body-alignment guide. Exercise instructions include a common form error and a direct correction.
- Coach connects a persistent same-lift stall to a relevant form cue, while explicitly treating it as something to check rather than claiming logs reveal technique.
- Exercise substitutions are included in data backups. Invalid or duplicate substitutions are rejected during restore, and imported sessions are sorted by date.
- The research library now cites the published Pelland 2026 meta-regression and the 2026 ACSM position stand. Forge’s displayed volume bands remain starting heuristics.

## Design (v17)

- Today leads with the session and a single Start button; optional check-ins (calibration, readiness, weekly measurements, posture notes) sit below under "Check-ins".
- Coach opens from the sparkle button in each page header as a bottom sheet.
- Geist and Newsreader are bundled in `fonts/` and cached by the service worker, so typography is identical offline.
- v25 atlas: muscles are drawn by head with their tendons and attachments (3 quad heads + patellar tendon, 2 hamstring heads, glute max and med, both gastrocnemius heads + soleus + Achilles, biceps long/short head + brachialis, 3 triceps parts, 3 deltoid heads, upper/mid/lower trap, lats, teres major, infraspinatus, pec upper/lower, serratus, obliques, rectus abdominis). Primary movers are red; secondary movers are amber.
- v26 refinement: anatomical feet (heel, arch, toes, ankle bone) and hands (palm, curled fingers, thumb, finger lines) in side and front/back views; hair, ears, brow and neck muscle on the head.
- v27 exercise-motion audit: all 32 demos were checked against their technique. Fixed: Prone Y raise (now lying face-down, arms lifting off the floor), Half-kneeling glute squeeze (tuck, then forward shift, hands on hips), Band pull-apart, Face pull and Reverse fly (straight arms, with arm foreshortening when they point toward or away from the viewer), Wall push-up plus (blade protraction at the top).
- v28 smoothness and timing: the demo now draws the ghosts and path once and only updates the moving parts in place (about 42 KB of markup per frame instead of 124 KB, with no DOM rebuild), and it drops to 30 fps automatically on slow phones instead of stuttering. Every exercise has its own tempo taken from its method cues (for example a 2 s lowering on bench, 3 s lowering on preacher curl and reverse crunch, 1 s pause at the top of leg extension, 2 s hold at the top of the glute bridge and prone Y). Joint timing is natural in the Romanian deadlift (hips lead, torso follows) and the lateral raise (elbows lead, hands follow).
- v29 multi-angle camera: exercises that one view cannot explain now have a second angle, with an Orbit mode that swings between them every two reps (or tap Orbit, Side, Back, Top to pick one). Prone Y raise: side plus top-down (shows the Y spread). Band pull-apart, face pull, reverse fly, wall slide: front or back plus side (shows straight arms and hand height). Chest-supported row: now on an incline pad, plus a back view (elbow flare and blade squeeze). Wall push-up plus: side plus back view (blade protraction).
- Presentation only: training, progression, volume, readiness, Coach rules, backups and storage are unchanged from v16.

## Form guide and logo (v18)

- Every exercise demo now has three views: **Movement** (the original animation), **Right position** (a numbered posture guide with a green alignment line), and **Mistakes** (animated red-versus-green comparisons of the common errors, with a short fix for each).
- All 33 exercises are covered, most with two mistakes. Each mistake is shown from the exercise's own camera angle, so frontal-plane faults such as knee cave are replaced by errors that view can show.
- The figures are stylised procedural animations drawn in the app, not photographs or GIFs, so they work offline and need no extra files.
- New app icon: an anvil built from stacked weight plates, with a glowing heat seam under the face, with a maskable variant that survives circular and rounded launcher masks.
- The guide data lives in the `GV` table inside `index.html`. Presentation only: no training, progression or storage logic changed.

## Motion engine v2 + anatomy figure (v30)

- The mannequin is replaced by an anatomical figure: real muscle shapes with fibre lines (pecs, abs, obliques, lats, traps, erectors, deltoids, biceps, triceps, forearms, glutes, quads, hamstrings, calves) attached to the skeleton and deforming with every pose. Side view and front/back views both use it.
- The working muscles for each exercise light up red on their actual shapes and pulse gently; every other muscle stays grey.
- Movement runs on an eased timeline (lift, hold, slower return, settle, light breathing), with faint ghosts of both ends of the range, a dashed path trace with a live dot, and the cue captions cycling per rep.
- The alignment line is a thin curved spine ribbon that blends green to red; in Mistakes a ghost of the correct position sits behind the faulty one.
- v24 clean-up: each muscle has soft volume shading, fibre lines are fewer and fainter, outlines are thinner, and ghosts are flat silhouettes so they no longer add clutter.
- v25 atlas: muscles are drawn by head with their tendons and attachments (3 quad heads + patellar tendon, 2 hamstring heads, glute max and med, both gastrocnemius heads + soleus + Achilles, biceps long/short head + brachialis, 3 triceps parts, 3 deltoid heads, upper/mid/lower trap, lats, teres major, infraspinatus, pec upper/lower, serratus, obliques, rectus abdominis). Primary movers are red; secondary movers are amber.
- v26 refinement: anatomical feet (heel, arch, toes, ankle bone) and hands (palm, curled fingers, thumb, finger lines) in side and front/back views; hair, ears, brow and neck muscle on the head.
- v27 exercise-motion audit: all 32 demos were checked against their technique. Fixed: Prone Y raise (now lying face-down, arms lifting off the floor), Half-kneeling glute squeeze (tuck, then forward shift, hands on hips), Band pull-apart, Face pull and Reverse fly (straight arms, with arm foreshortening when they point toward or away from the viewer), Wall push-up plus (blade protraction at the top).
- v28 smoothness and timing: the demo now draws the ghosts and path once and only updates the moving parts in place (about 42 KB of markup per frame instead of 124 KB, with no DOM rebuild), and it drops to 30 fps automatically on slow phones instead of stuttering. Every exercise has its own tempo taken from its method cues (for example a 2 s lowering on bench, 3 s lowering on preacher curl and reverse crunch, 1 s pause at the top of leg extension, 2 s hold at the top of the glute bridge and prone Y). Joint timing is natural in the Romanian deadlift (hips lead, torso follows) and the lateral raise (elbows lead, hands follow).
- v29 multi-angle camera: exercises that one view cannot explain now have a second angle, with an Orbit mode that swings between them every two reps (or tap Orbit, Side, Back, Top to pick one). Prone Y raise: side plus top-down (shows the Y spread). Band pull-apart, face pull, reverse fly, wall slide: front or back plus side (shows straight arms and hand height). Chest-supported row: now on an incline pad, plus a back view (elbow flare and blade squeeze). Wall push-up plus: side plus back view (blade protraction).
- Presentation only: training, progression, volume, readiness, Coach, backups and storage are unchanged.

## Handover (v33)

- The in-code handover now also holds everything from the original external handover (owner context, programme, logic rules, research log including the v31 and v32 sources, how the build was tested). No behaviour change.

## Daily walk (v32)

- Today shows a daily step target and an optional treadmill block once you have logged steps on at least 5 of the last 14 days; Progress > Body shows energy estimates for three treadmill settings. The target is your own average plus 1,500 steps, capped at 10,000, and is held when recovery signals are on. The treadmill block keeps the incline modest around leg days. No trial has shown an ideal treadmill speed or incline for recomposition, so these are judgement defaults with energy estimates from two published equations, and Forge never changes calories from steps alone. Nothing new is saved.

## Training intelligence (v31)

- Week replanning now uses one planner: missed sessions, volume deficits against Forge's bands, readiness, the minutes you have each day (chips on Week), exercise priority and fatigue. Fatigue check separates local muscle fatigue from body-wide fatigue; a local trim happens only at Moderate confidence and can be undone with Keep full volume. A Recomposition card reads weight and waist trends with steps, training and your optional calorie target, and suggests a small calorie change only after several gates pass. Every recommendation has a Why link showing the reasoning, the data, the confidence and what would change it. All on-device; thresholds are Forge judgement and are not validated on real data yet.

## Handover lives in the code

index.html contains a plain-text block (script id="handover") with the full handover, the changelog and the standing rule: every change made in any chat is written into that block in the same delivery, so no separate handover is needed. Read it first.

## Shipping an update

Replace the app files, then change the `CACHE` version in `sw.js` (for example, from `forge-v32` to `forge-v33`). Open the site online once and reload it to install the new app shell. Keep the published URL unchanged so the browser keeps access to the same local data.
