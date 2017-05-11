const messages = module.exports = {
  peak: {
    message: 'Is peaking, attention is required',
    priority: 1
  },
  overheating: {
    message: 'Is overheating, immediate attention is required',
    priority: 2
  },
  efficientLow: {
    message: 'Is running low efficient, it can be turned off',
    priority: 1
  },
  broadbandLow: {
    message: 'The 2G broadband data bundle is running out of credits, data upgrade is required',
    priority: 1
  },
  additionalGenerator: {
    message: 'To much power is asked, an additional generator needs te be started',
    priority: 2
  },
  lostConnection: {
    message: 'The connection with this generator is lost',
    priority: 2
  },
  fuelLow: {
    message: 'The fuel is running low, refuel is required',
    priority: 2
  },
  unknownError: {
    message: 'Unknown error with this generator',
    priority: 0
  }
};