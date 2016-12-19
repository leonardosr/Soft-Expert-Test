export function isEnabled(name) {

	if(testOptions.filter && name == "filter")
		return true;

    return window.location.hash.split('#').includes(name);
}
