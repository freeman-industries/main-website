window.Alert = (title, message, buttons = []) => {
	if (!buttons.length) {
		buttons.push({
			text: 'OK',
		});
	}

	// dismiss hook to be used when a button is pressed and fire any callbacks from the caller
	const dismiss = (onPress) => {
		wrapper.remove();

		onPress && onPress();
	};

	// we need to namespace all the elements to freeman- in case other plugins interfere with the styling.
	const wrapper = document.createElement('div');
	wrapper.classList.add('freeman-alert-wrapper');

	const alert = document.createElement('div');
	alert.classList.add('freeman-alert');
	wrapper.append(alert);

	const title_element = document.createElement('div');
	title_element.classList.add("freeman-alert-title");
	title_element.textContent = title;
	alert.append(title_element);

	const message_element = document.createElement('div');
	message_element.classList.add("freeman-alert-message");
	message_element.textContent = message;
	alert.append(message_element);

	const buttons_element = document.createElement('div');
	buttons_element.classList.add("freeman-alert-buttons");

	// when there are 1 or 2 buttons, we can show them in a horizontal manner for a more binary choice.
	// the apps do this too.
	if (buttons.length <= 2) {
		// but if the text is too long we should allow the buttons to get wider.
		// 15 characters seems to be a good compromise for this.
		if (!buttons.find(({ text }) => text.length > 15)) {
			buttons_element.classList.add("freeman-alert-buttons-row");
		}
	}

	alert.append(buttons_element);

	for (const { style, text, onPress } of buttons) {
		const button_element = document.createElement('button');

		button_element.classList.add('freeman-alert-button');
		if (style) button_element.classList.add(style);

		button_element.textContent = text;
		button_element.onclick = () => dismiss(onPress);

		buttons_element.append(button_element);
	}

	document.body.append(wrapper);
};
