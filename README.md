# Watt now

Watt now: [Live demo](#)

## Concept
The server recieves data from the generators (Watt-Now sensors), the timetable for all the acts and a list with all the energy zones. By using these datasets the server predicts what generators need to be used at what time and for what task.

When the server predicts a spike in the energy useage. The maintenance crew will get a notification on there phone, that tells them what energy zone needs a bigger/smaller generator or when to turn them off. By doing this the maintenance crew can easyer keep track of the generator and energy usage and the generator usage will go down, what is cheaper for the organisation.

## Flow
![flow-chart](./repo-images/flow-chart.png)

## Features

## Build / Install and start project

### Clone this repo

```
  git clone https://github.com/TimoVerkroost/minor-watt-now
  cd minor-watt-now
```

### Install the dependencies
```
npm install
```

### Environment setup (.env file)
```
VAR=VALUE
```

### Build CSS and JS
This will build the minified and cleaned CSS and JavaScript files.
```
npm run build
```

### Start server
```
npm start
```

### Start server with live updates
```
npm run start-update
```

### Watch changes
```
npm run watch
```

## Finished todo's

## Wishlist

## Licence
MIT © Timo Verkroost, Colin Dörr, Diego Staphorst
