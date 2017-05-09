# Watt now

<!-- ______________________ EISEN ______________________
- [ ] Goede README bij de team-repo op Github (incl. Install notes, purpose, future work)
- [ ] Er moet real life data gemeten worden die real-time ergens gevisualiseerd wordt
- [ ] Het moet nuttig zijn, je moet kunnen verdedigen dat het stroomverbruik zou verminderen
- [ ] Real life en real-time: Er moet real life data gemeten worden die real-time ergens gevisualiseerd wordt zodat eindgebruikers actie kunnen ondernemen.
- [ ] Er moet minimaal een databron/input-stroom zijn waarvan je kan verwachten dat die tijdens het festival verandert (dus niet ALLEEN het programma)

Demo’s kunnen eventueel gescript worden (dispatch zelf events adhv jouw scenario)
___________________________________________________ -->

Watt now: [Live demo](#)

## Concept
The server recieves data from the generators (Watt-Now sensors), the timetable for all the acts and a list with all the energy zones. By using these datasets the server predicts what generators need to be used at what time and for what task.

When the server predicts a spike in the energy useage. The maintenance crew will get a notification on there phone, that tells them what energy zone needs a bigger/smaller generator or when to turn them off. By doing this the maintenance crew can easyer keep track of the generator and energy usage and the generator usage will go down, what is cheaper for the organisation.

## Usage
- Watt-Now has installed the different sensors, that keep track of the generators data and power usage.
- The data from the generators and the power usage gets send to the server, that collects the data for every power grid.
- The server predicts based on previes collected data and on the event program, if there will be a possible power spike in the next 20 a 30 minutes.
- If the server detects, that there will be a power spike/ power dip, it will send a notification to the on-site technicians.
- The on-site technicians will recieve the notification, that tells them what generator can be turned on/off.
- The on-site technicians will go to the generators and will turn a generator on/off depending on the power demand.

- If at any moment, the event organisator, Watt-Now or any of the on-site technicians want to see the generator data, he/she can go to the online dashboard and can see the live data of all the generators.

<!-- ## Monitoring / Possible generators
- Schuko (16A) generator
- 32A generator
- 63A generator
- (125A) generator
- Powerlock (400A) generator -->

## Stakeholders
- <strong>On-site technicians </strong>: The on-site technicians want everything to work propperly, want to prefent possible problems and want real-timel information of the generators wherever they are.
<br/><br/>
Our Idea is a real-time dashboard, where the on-site technicians can see the energy usage of all the generators. It will also help the on-site technicians by predicting, when there will be a power spike, so that the technicians can use a stronger generator, to prefent possible power shortage  or overuse.
<br/><br/>

- <strong>Event organisator </strong>: The event organisator wants to keep the costs as low as possible and he/she wants to prefent overcapacity of the generators.
<br/><br/>
Our idea will give the event organisator a real-time dashboard, with live data about all the generators and there usage. This way, the event organisator can keep better track of the generator capacity and will have a better idea of the total usage and costs.
<br/><br/>

- <strong>Watt-Now </strong>: Watt-now wants to have real-time data about the generators and want to be able, to predict possible power spikes.
<br/><br/>
Our idea will give Watt-now a real-time dashboard, that is easy to understand, that shows the live generator data and will also show, when a generator needs to be updated, or when a smalle generator can be used.

## Features
- Live data collection from the generators.
- Datavisualisation of the collected data.
- Real-time data updates.
- Power usage predictions.
- Notifications, to predefined mobile devices.


## Flow
![flow-chart](./repo-images/flow-chart.png)

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
