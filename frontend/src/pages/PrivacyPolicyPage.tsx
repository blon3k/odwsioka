import LegalPageTemplate from '../components/LegalPageTemplate'

export default function PrivacyPolicyPage() {
  return (
    <LegalPageTemplate
      title="Polityka prywatności"
      subtitle="Informujemy, w jaki sposób przetwarzamy dane osobowe w sklepie internetowym Odwsioka (odwsioka.pl)."
      lastUpdated="19 czerwca 2026"
      sections={[
        {
          title: 'Administrator danych',
          paragraphs: [
            'Administratorem Twoich danych osobowych jest Antoni Blonkowski, prowadzący działalność gospodarczą pod firmą BLONEKDEV, NIP: PL5711727874 (dalej: „Administrator” lub „Sklep”).',
            'W sprawach związanych z ochroną danych możesz skontaktować się z nami pod adresem e-mail: blon3kdev@gmail.com.',
          ],
        },
        {
          title: 'Charakter działalności Sklepu',
          paragraphs: [
            'Odwsioka (odwsioka.pl) to sklep internetowy działający w modelu pośrednictwa sprzedaży (dropshipping). Administrator jest właścicielem i operatorem Sklepu, lecz nie jest producentem oferowanych towarów.',
            'Produkty dostępne w Sklepie pochodzą od niezależnych producentów i gospodarstw, z którymi Administrator współpracuje na podstawie umów pośrednictwa. Aktualni partnerzy to m.in.: Grodziskie Sery Rzemieślnicze Groser (grodziskiesery.pl), Miód Dobry (miod-dobry.pl) oraz gospodarstwo Mlecznie pod kasztanem (mleczniepodkasztanem.pl).',
            'Informacje o certyfikatach, nagrodach, składzie produktów oraz szczegółach produkcji znajdują się na stronach internetowych poszczególnych producentów.',
          ],
        },
        {
          title: 'Jakie dane zbieramy',
          paragraphs: [
            'W związku z realizacją zamówień przetwarzamy m.in. imię i nazwisko, adres dostawy, numer telefonu oraz adres e-mail — w zakresie niezbędnym do obsługi zamówienia i kontaktu z Klientem.',
            'Podczas korzystania ze strony mogą być przetwarzane dane techniczne niezbędne do jej prawidłowego działania (np. adres IP, typ przeglądarki), w zakresie wynikającym z logów serwera.',
          ],
        },
        {
          title: 'Cel przetwarzania i odbiorcy danych',
          paragraphs: [
            'Dane wykorzystujemy do obsługi zamówień, kontaktu w sprawach zamówienia, reklamacji i zwrotów oraz — za Twoją zgodą — do informowania o nowych dostawach i promocjach.',
            'W celu realizacji płatności korzystamy z platformy Shopify. Dane niezbędne do przeprowadzenia transakcji mogą być przekazywane i przetwarzane przez Shopify zgodnie z polityką prywatności tego operatora.',
            'Dane potrzebne do wysyłki produktu przekazujemy odpowiedniemu producentowi-partnerowi, od którego pochodzi zamówiony towar. Każdy producent przetwarza dane wyłącznie w zakresie niezbędnym do realizacji dostawy i obsługi reklamacji dotyczącej swojego produktu.',
          ],
        },
        {
          title: 'Twoje prawa',
          paragraphs: [
            'Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych oraz wniesienia sprzeciwu wobec przetwarzania.',
            'Masz też prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, jeśli uznasz, że przetwarzanie narusza przepisy RODO.',
          ],
        },
        {
          title: 'Pliki cookies',
          paragraphs: [
            'Strona odwsioka.pl nie wykorzystuje własnych plików cookies ani podobnych technologii śledzących. Nie stosujemy banerów cookies ani narzędzi analitycznych wymagających zgody na pliki cookies po stronie Sklepu.',
            'Po przekierowaniu do procesu płatności Shopify mogą obowiązywać odrębne zasady dotyczące plików cookies — szczegóły znajdują się w dokumentacji Shopify.',
          ],
        },
      ]}
    />
  )
}
