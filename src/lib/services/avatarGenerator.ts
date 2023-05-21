interface Color {
	r: number;
	g: number;
	b: number;
}

function _generateContrastingColor(bgColor: Color): string {
	// Calculate the YIQ value to determine whether the color is light or dark
	const yiq: number = (bgColor.r * 299 + bgColor.g * 587 + bgColor.b * 114) / 1000;
	return yiq >= 128 ? '#222' : 'white';
}

function _generatePastelColor(): { rgb: string; contrastingColor: string } {
	const color: Color = {
		r: Math.floor(Math.random() * 128 + 127),
		g: Math.floor(Math.random() * 128 + 127),
		b: Math.floor(Math.random() * 128 + 127)
	};
	return {
		rgb: `rgb(${color.r}, ${color.g}, ${color.b})`,
		contrastingColor: _generateContrastingColor(color)
	};
}

function _shortName(name: string) {
	const nameArray = name.split(' ');

	// This variable will hold the resulting shortened name
	let resultName = '';

	// If the name consists of one word or two words
	if (nameArray.length <= 2) {
		// Loop over each word in the name
		for (let i = 0; i < nameArray.length; i++) {
			// Add the first character of the word to the result,
			// and convert it to uppercase
			resultName += nameArray[i][0].toUpperCase();
		}
	}
	// If the name consists of more than two words
	else {
		// Only consider the first two words
		for (let i = 0; i < 2; i++) {
			// Add the first character of the word to the result,
			// and convert it to uppercase
			resultName += nameArray[i][0].toUpperCase();
		}
	}
	// Return the resulting shortened name
	return resultName;
}

export default function avatarGenerator(name: string) {
	const color = _generatePastelColor();
	const shortName = _shortName(name);

	return {
		svg: `
            <svg 
                class="avatar-generator" 
                xmlns='http://www.w3.org/2000/svg' 
                xmlns:xlink='http://www.w3.org/1999/xlink' 
                viewBox='0 0 100 100' 
                width='100' 
                height='100'>
                    <rect 
                        width='100' 
                        height='100' 
                        x='0' 
                        y='0' 
                        fill='${color.rgb}'>
                    </rect>
                    <text 
                        class="avatar-generator__text" 
                        x='50%' 
                        y='50%' 
                        alignment-baseline='central' 
                        text-anchor='middle'
                        fill='${color.contrastingColor}'
                        dominant-baseline='middle'>
                            ${shortName}
                    </text>
            </svg>`
			.replaceAll('\n', '')
			.replace(/\s+/g, ' ')
			.trim(),
		color,
		shortName
	};
}
