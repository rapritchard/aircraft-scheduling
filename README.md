# Aircraft Scheduler

## Setup

## Confirmed limitations

- Only one day worth of schedule can be entered (“tomorrow”).
- Only one aircraft is considered.
- Pushing the finished schedule to the back-end is not to be supported.

## Assumptions

- We will only support desktop (unless I can fit in making a mobile design)
- We will use the Context API and the Fetch API to reduce overall size.
- Aircraft can only start from their base but can end the day at any airport.
- Clicking on an aircraft will select it for editing its rotation.
- Clicking on a flight will add it to the rotation, and clicking on the flight in the rotation list will remove it.
- The list of flights will adjust based on what the most recent flight in the rotation is to filter out flights that will not be possible.
