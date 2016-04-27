import 'ScrollMagic';
import 'debug.addIndicators';
import 'ScrollMagic.velocity';

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
