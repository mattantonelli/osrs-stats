import datetime
import json
import os
import re

RUNELITE_PATH = os.path.join(os.environ['USERPROFILE'], '.runelite/screenshots')
LEVEL_REGEX = r'^(\w+)\((\d+)\) (.+)\.'

# Grab the list of characters from the screenshots folder
characters = os.listdir(RUNELITE_PATH)

# Display the list of characters with incrementing letters for selection
print('Select a character:')
for i, character in enumerate(characters):
    print(f'{chr(97 + i)}) {character}')

# Have the user select a character from the list
character = None
while character == None:
    index = 97 - ord(input())

    if index < 0 or index > len(characters) - 1:
        print('Invalid input.')
    else:
        character = characters[index]

# Collect the level data for the selected character using the screenshot files
screenshot_path = os.path.join(RUNELITE_PATH, character, 'Levels')
levels = []

for filename in os.listdir(screenshot_path):
    # Extract the level information from the filename and add it to the list
    match = re.match(LEVEL_REGEX, filename)

    if match:
        levels.append(
            {
                'skill': match.group(1).capitalize(),
                'level': int(match.group(2)),
                'datetime': datetime.datetime.strptime(match.group(3), '%Y-%m-%d_%H-%M-%S').isoformat()
            }
        )
    else:
        print(f'Could not parse: {filename}')

# Sort by date
levels = sorted(levels, key=lambda level: level['datetime'])

# Write the output to a file as JSON
output_directory = 'vendor' if os.path.isdir('vendor') else '.'

with open(f'{output_directory}/{character}.json', 'w') as output:
    json.dump(levels, output, indent=2)