import './css/Hero.css'

export function Hero({ title, subtitle, bgImage, children }) {
	return (
		<section className="hero">
			<h1>{title}</h1>
			<div className="subtitle">
				<p>{subtitle}</p>
			</div>
			{children}
		</section>
	);
}

/*
  bgImage prop will be 
  { srcset: string[]; alt: string; }
*/
