import { createAnimation } from '@ionic/react';

type AnimationFn = { (elClassName: string, iterations?: number): void };

export const animateToComeFromTheLeftSide: AnimationFn = (
	elClassName,
	iterations = Infinity,
) => {
	const el = document.querySelector(`.${elClassName}`);
	if (el) {
		const animation = createAnimation()
			.addElement(el)
			.duration(1000)
			.direction('alternate')
			.iterations(iterations)
			.keyframes([
				{ offset: 0, transform: 'scale(3)', opacity: '1' },
				{
					offset: 1,
					transform: 'scale(1.5)',
					opacity: '0.5',
				},
			]);
		animation.play();
	}
};
