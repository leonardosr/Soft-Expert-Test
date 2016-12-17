export function toggleListItemsDisplay(className, display) {

    var listItems = document.getElementsByClassName('todo__item todo__item--' + className );

    for(var i = 0; i != listItems.length; ++i)
    {
        listItems[i].style.display = display;
    }

}

export function changeFilters(value) {

	switch(value) {
	    case 'all':
	        toggleListItemsDisplay('open', 'list-item');
	        toggleListItemsDisplay('done', 'list-item');
	        break;
	    case 'open':
	        toggleListItemsDisplay('open', 'list-item');
	        toggleListItemsDisplay('done', 'none');
	        break;
	    case 'done':
	        toggleListItemsDisplay('open', 'none');
	        toggleListItemsDisplay('done', 'list-item');
	        break;
	    default:
	        return false;
	}

}