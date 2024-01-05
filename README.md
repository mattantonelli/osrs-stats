# OSRS Stats

A [Next.js](https://nextjs.org/) application that provides a graphical history of the growth of an [Old School RuneScape](https://oldschool.runescape.com/) character using [Chart.js](https://www.chartjs.org/).

The data used by the application is acquired using a Python script which reads a user's local [RuneLite](https://runelite.net/) screenshot directory to parse level-up screenshots into historic JSON data.

## Installation

```bash
git clone https://github.com/mattantonelli/osrs-stats
cd osrs-stats
npm install
```

### Add your character data

To add your character's data, you will need the have [Python 3](https://www.python.org/downloads/) installed, and you will need to have Runelite installed with Level Screenshots enabled.

```bash
py fetch_character.py
```

After selecting your character, your level-up data will be saved to the `vendor` directory. Update the character name in the URL to navigate to your character.

### Starting the server

```bash
npm run dev
```