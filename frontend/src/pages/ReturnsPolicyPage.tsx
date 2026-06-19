import LegalPageTemplate from '../components/LegalPageTemplate'

export default function ReturnsPolicyPage() {
  return (
    <LegalPageTemplate
      title="Polityka zwrotów"
      subtitle="Zasady zwrotów i reklamacji produktów zakupionych w sklepie Odwsioka."
      lastUpdated="19 czerwca 2026"
      sections={[
        {
          title: 'Informacje ogólne',
          paragraphs: [
            'Odwsioka (odwsioka.pl) działa jako sklep pośredniczący — nie jesteśmy producentem oferowanych towarów. Produkty pochodzą od niezależnych gospodarstw i producentów (m.in. grodziskiesery.pl, miod-dobry.pl, mleczniepodkasztanem.pl), z którymi współpracujemy na podstawie umów pośrednictwa.',
            'Operator Sklepu: Antoni Blonkowski, BLONEKDEV, NIP: PL5711727874. Kontakt w sprawach zwrotów: blon3kdev@gmail.com.',
          ],
        },
        {
          title: 'Prawo odstąpienia',
          paragraphs: [
            'Konsument ma prawo odstąpić od umowy w terminie 14 dni bez podania przyczyny, z wyjątkiem produktów, które ze względu na swój charakter nie podlegają zwrotowi po otwarciu opakowania (np. produkty szybko psujące się, żywność zapakowana w sposób uniemożliwiający weryfikację integralności opakowania).',
            'W przypadku zamówień obejmujących produkty od różnych producentów, zwrot każdego produktu jest rozpatrywany zgodnie z zasadami obowiązującymi u danego partnera.',
          ],
        },
        {
          title: 'Reklamacje jakościowe',
          paragraphs: [
            'Jeśli otrzymany produkt jest uszkodzony, niezgodny z zamówieniem lub nie spełnia oczekiwanej jakości, skontaktuj się z nami w ciągu 48 godzin od dostawy.',
            'Reklamację zgłaszaj na adres blon3kdev@gmail.com, dołączając zdjęcia produktu i opis problemu. Koordynujemy rozpatrzenie reklamacji z producentem-partnerem, od którego pochodzi dany towar.',
          ],
        },
        {
          title: 'Procedura zwrotu',
          paragraphs: [
            'Aby zwrócić produkt, napisz do nas maila z numerem zamówienia i powodem zwrotu. Po akceptacji zwrotu otrzymasz instrukcje dotyczące odesłania produktu — zwrot może nastąpić bezpośrednio do producenta-partnera lub zgodnie z uzgodnioną procedurą.',
            'Koszt odesłania produktu ponosi kupujący, chyba że zwrot wynika z naszego błędu lub wady produktu.',
          ],
        },
        {
          title: 'Zwrot środków',
          paragraphs: [
            'Zwrot płatności następuje w ciągu 14 dni od otrzymania zwróconego produktu lub od potwierdzenia reklamacji — tą samą metodą płatności, która została użyta przy zakupie (za pośrednictwem Shopify), o ile nie uzgodnimy inaczej.',
          ],
        },
        {
          title: 'Kontakt',
          paragraphs: [
            'W razie pytań dotyczących zwrotów lub reklamacji napisz na blon3kdev@gmail.com. Odpowiadamy w dni robocze, zwykle w ciągu 24–48 godzin.',
            'Szczegółowe informacje o certyfikatach, składzie i warunkach przechowywania produktów znajdują się na stronach internetowych poszczególnych producentów-partnerów.',
          ],
        },
      ]}
    />
  )
}
