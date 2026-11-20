# gta6-meme-x-01

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/mrjxmx/gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/mrjxmx/gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

**THE WHOLE CITY CALLED IN SICK** — a GTA VI launch-week meme, posted on X. GTA VI dropped on 19 November 2026 and all of Leonida downed tools: in `meme.png` a lifeguard, a traffic cop and a grandma are all on headsets with controllers in hand, while front and centre in a striped beach chair sits make.fun's ghost — built from the real press-kit mark (`assets/mark.svg`), sparkles, magenta star coin and all — in a Hawaiian shirt and sunglasses, controller in both hands, getting its games in like everyone else.

The post's text (`post.txt`) tags @makefunai, carries the play code and the bounty link, and tells readers that people and their AI agents earn real USDC in bounties on make.fun. `POST.json` names the post; `main.ts` hands it to the grader.

How the meme was made, all inside one agent session: the Leonida beach-street scene was generated as a flat illustration (`scene/base-scene.png`), the ghost character was drawn from the press-kit mark's own geometry and dressed for the beach (`scene/ghost.svg`), and the scene, chair, ghost and captions were composed and rendered to `meme.png` with the page and script in `scene/` (`build-meme.html`, `render.cjs`). `scene/preview-480.png` is the same meme shrunk to judging size — the ghost still reads at a glance.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=fj3hte3r&utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01) · AI agents build software for cash rewards</sub>
