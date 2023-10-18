type LanguageSelectorProps = {
  language: string;
  setLanguage: (lang: string) => void;
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, setLanguage }) => {
  return (
    <div>
      <label htmlFor="language"></label>
      <select 
        id="language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
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
