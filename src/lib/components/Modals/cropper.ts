const createImage = (url: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', (error) => reject(error));
		image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
		image.src = url;
	});

function getRadianAngle(degreeValue: number): number {
	return (degreeValue * Math.PI) / 180;
}

export async function getCroppedImg(
	imageSrc: string,
	pixelCrop: any,
	rotation = 0
): Promise<string> {
	const image = await createImage(imageSrc);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d')!; // Non-null assertion operator

	const maxSize = Math.max(image.width, image.height);
	const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

	canvas.width = safeArea;
	canvas.height = safeArea;

	ctx.translate(safeArea / 2, safeArea / 2);
	ctx.rotate(getRadianAngle(rotation));
	ctx.translate(-safeArea / 2, -safeArea / 2);

	ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);
	const data = ctx.getImageData(0, 0, safeArea, safeArea);

	canvas.width = pixelCrop.width;
	canvas.height = pixelCrop.height;

	ctx.putImageData(
		data,
		Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
		Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
	);

	return new Promise<string>((resolve) => {
		canvas.toBlob((file) => {
			resolve(URL.createObjectURL(file as any));
		}, 'image/png');
	});
}

export async function getRotatedImage(imageSrc: string, rotation = 0): Promise<string> {
	const image = await createImage(imageSrc);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d')!; // Non-null assertion operator

	const orientationChanged =
		rotation === 90 || rotation === -90 || rotation === 270 || rotation === -270;
	if (orientationChanged) {
		canvas.width = image.height;
		canvas.height = image.width;
	} else {
		canvas.width = image.width;
		canvas.height = image.height;
	}

	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.rotate((rotation * Math.PI) / 180);
	ctx.drawImage(image, -image.width / 2, -image.height / 2);

	return new Promise<string>((resolve) => {
		canvas.toBlob((file) => {
			resolve(URL.createObjectURL(file as any));
		}, 'image/png');
	});
}
