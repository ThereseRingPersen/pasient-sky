import { findAvailableTime } from './FindAvailableTime';
import {joannaId, emmaId, dannyId} from './FindAvailableTime/data';

console.log(findAvailableTime(
  [joannaId, emmaId],
  '2019-02-01T13:00:00Z/2019-06-27T10:30:00',
  10,
  ['452935de-975e-11e5-ae1a-c8e0eb18c1e9']
));