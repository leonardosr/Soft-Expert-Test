import '../css/main.css';

import {todos} from './state';
import {registerEventHandlers} from './events';
import {renderView} from './view.js';

todos.subscribe(newState => renderView(document.body, newState));

renderView();

registerEventHandlers();