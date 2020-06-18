import { renderCurrentMonth } from './renderCurrentMonth';
import { initNavigation } from './navigation';
import renderWeek from './renderWeek';

export default function () {
  renderWeek();
  renderCurrentMonth();
  initNavigation();
}
