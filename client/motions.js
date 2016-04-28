import 'ScrollMagic';
import 'ScrollMagic.velocity';

if ('production' !== process.env.NODE_ENV) {
  require('debug.addIndicators');
}

Velocity.RegisterEffect('cform.standOut', {
  defaultDuration: 300,
  calls: [
    [{translateY: -60}, 0.66],
    [{translateY: 0}, 0.34]
  ],
});

Velocity.RegisterEffect('cform.standBack', {
  defaultDuration: 300,
  calls: [
    [{translateY: 60}, 0.34],
    [{translateY: 0}, 0.66]
  ],
});
