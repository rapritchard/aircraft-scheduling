# Aircraft Scheduler

## Setup

Project was bootstrapped with Vite.

Run `npm install` to install dependencies.

To run the dev env use `npm run dev` or if you want to use a production build run `npm run build` and then `npm run preview` to serve the files to a local static web server, the port used will be displayed in the console.

## Confirmed limitations

- Only one day worth of schedule can be entered (“tomorrow”) so we won't allow the date to be changed.
- Only one aircraft is considered.
- Pushing the finished schedule to the back-end is not to be supported.

## Assumptions

- We will only support desktop.
- We will only support modern browsers, sorry IE 😓.
- All the aircraft have the base of "EGKK" which has no matches in the flights json, so I have assumed that we can travel to any airport for the first flight of the day 🤷‍♂️.
- Users can add any flight that fits before the first flight in the rotation assuming it matches the rules, otherwise we will only let users add flights to the end of the rotation.
  - For example they add flights in this order: AS1250 (17:25 GCRR Departure) -> AS1249 (12:35 LFSB Departure, 16:45 GCCR Arrival) -> AS1132 (07:05 LPPR Departure, 09:30 LFSB Arrival)
  - Removing a flight that isn't first or last in the list will check to see what other flights break the rules and remove them, starting from the first index to the last.
- Any flight that happens over midnight cannot be done as all flights must be grounded by that point, so we'll just remove them from the list of flights 🚫.

## Things I would do with a bit more time

I didn't have much free time to work on this so here is what I would have liked to do:

- Let users add flights into the middle of the rotation if its doable, right now you can only add to the start or end.
- Add a few more tests to really test every possible scenario alongside E2E tests with playwright.
- Incorporating the APIs more. Right now I just fetch all data and load it into the reducer.
- Error handling, I didn't focus on it too much as I wanted to just get a working project in the time I had.
- Make it look fancy. My design is basic but I think it gets the job done.
