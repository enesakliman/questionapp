import { useQuestion } from "../context/QuestionContext";

function StartPage() {
    const { handlestart } = useQuestion(); // function from context
  return (
    <>
      <div className="start">
        <div className="start-info">
          <h1>Question App</h1>
          <h2>Dikkat edilmesi gerekenler</h2>
          <ul>
            <li>
              Toplam 10 sorudan oluşmaktadır. Her soruya 30 saniye süre
              verilmiştir.
            </li>
            <li>
              Şıklardan birini seçmeme durumunda, süre tamamlandığında sıradaki
              soruya geçecektir.
            </li>
            <li>Soru cevapları, sınav sonunda gösterilecektir.</li>
          </ul>
          <h3>Başarılar dileriz.</h3>
          <button onClick={handlestart}>Teste Başlayınız</button> {/* start button */}
        </div>
      </div>
    </>
  );
}

export default StartPage;
