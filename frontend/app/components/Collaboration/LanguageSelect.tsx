type LanguageSelectorProps = {
  language: string;
  setLanguage: (lang: string) => void;
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, setLanguage }) => {
  return (
    <div>
      <label htmlFor="language" className="block text-sm font-medium text-blue-500"></label>
      <select 
        id="language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="inline-flex appearance-none pl-3 pr-10 py-2 text-base border-blue-500 bg-blue focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="csharp">C#</option>
      </select>
    </div>
  );
};
export default LanguageSelector;
