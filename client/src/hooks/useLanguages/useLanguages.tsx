import { useState } from 'react';
import Switch from './Switch';

function useLanguages() {
	const [language, setLanguage] = useState<'en' | 'es'>('en');

	const toggleLanguage = () => {
		setLanguage(prevLanguage => (prevLanguage === 'en' ? 'es' : 'en'));
	};

	return {
		language,
		Switch: <Switch handleClick={toggleLanguage} language={language} />,
	};
}

export default useLanguages;
