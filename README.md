# Aircraft Scheduler

## Setup

Project was bootstrapped with Vite.

Run `npm install` to install dependencies/

To run the dev env use `npm run dev` or if you want to a production build run `npm run build` and then use `npm run preview` to serve the files to a local static web server.

## Confirmed limitations

- Only one day worth of schedule can be entered (“tomorrow”).
- Only one aircraft is considered.
- Pushing the finished schedule to the back-end is not to be supported.

## Assumptions

- We will only support desktop (unless I can fit in making a mobile design)
- We will only support modern browsers (Sorry IE)
- All the aircraft have the base of "EGKK" which has no matches in the flights json, so I have assumed that we can travel to any airport at first.
  - Aircraft cannot take on other flights whilst flying to first airport
  - Time spent flying to the first airport will be treated as "idle" on the timeline as we are not ferrying any people / cargo.
- To keep things simple, Users must select flights in the order they want them to be scheduled. If we wanted to check if there are flights we could fit into the schedule we would need to loop through all currently selected flights and check there are no time conflicts.
- Any flight that happens over midnight cannot be done as all flights must be grounded by that point, so we'll just remove them from the list of flights
