import SearchBar from '@/components/SearchBar';
import ThemeToggle from '@/components/ThemeToggle';
import Card from '@/components/ui/Card';
import {
  TrendingUp,
  Zap,
  Monitor,
  Smartphone,
  HardDrive,
  Cpu,
  Search,
  ShieldCheck,
  Clock,
  Wallet,
  Headphones,
  Laptop,
  Gamepad2,
  Tv,
  Watch,
  Wifi,
  Keyboard,
  Camera,
  BatteryCharging,
  Tablet,
  Speaker,
  MousePointer,
  Printer,
  Router,
  Usb,
  Fan,
  Glasses,
  Radio,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { label: 'Smartphones', icon: Smartphone, query: 'iPhone 15 Pro Max' },
  { label: 'Fones Bluetooth', icon: Headphones, query: 'AirPods Pro 2' },
  { label: 'Notebooks', icon: Laptop, query: 'MacBook Air M3' },
  { label: 'Placas de Vídeo', icon: Zap, query: 'RTX 4060 Ti 8GB' },
  { label: 'Monitores', icon: Monitor, query: 'Monitor 27 144Hz' },
  { label: 'Processadores', icon: Cpu, query: 'Ryzen 7 7800X3D' },
  { label: 'SSD e Armazenamento', icon: HardDrive, query: 'SSD NVMe 1TB' },
  { label: 'Consoles', icon: Gamepad2, query: 'PlayStation 5' },
  { label: 'Smart TVs', icon: Tv, query: 'Smart TV 4K 55' },
  { label: 'Smartwatches', icon: Watch, query: 'Apple Watch Series 9' },
  { label: 'Redes e Wi-Fi', icon: Wifi, query: 'Roteador Wi-Fi 6' },
  { label: 'Teclado e Mouse', icon: Keyboard, query: 'Teclado Mecânico Redragon' },
  { label: 'Câmeras', icon: Camera, query: 'GoPro Hero 12' },
  { label: 'Memória RAM', icon: Cpu, query: 'Memória DDR5 32GB' },
  { label: 'Carregadores', icon: BatteryCharging, query: 'Carregador GaN 65W' },
  { label: 'Tablets', icon: Tablet, query: 'iPad Air' },
  { label: 'Caixas de Som', icon: Speaker, query: 'JBL Flip 6' },
  { label: 'Mouse Gamer', icon: MousePointer, query: 'Mouse Logitech G502' },
  { label: 'Impressoras', icon: Printer, query: 'Impressora Epson EcoTank' },
  { label: 'Roteadores Mesh', icon: Router, query: 'Roteador TP-Link AX3000' },
  { label: 'Acessórios USB', icon: Usb, query: 'Cabo USB-C 2m' },
  { label: 'Coolers e Fans', icon: Fan, query: 'Water Cooler 240mm' },
  { label: 'Óculos VR', icon: Glasses, query: 'Meta Quest 3' },
  { label: 'Rádios e Comunicação', icon: Radio, query: 'Rádio Comunicador Baofeng' },
];

const trending = [
  'RTX 4060',
  'iPhone 15 Pro Max',
  'SSD 1TB NVMe',
  'Ryzen 7 7800X3D',
  'MacBook Air M3',
  'Galaxy S24 Ultra',
  'AirPods Pro 2',
  'PlayStation 5',
  'Xiaomi Redmi Note 13',
  'Samsung Galaxy Buds 3',
  'JBL Flip 6',
  'Monitor LG 27 UltraGear',
  'HD Externo 2TB',
  'RTX 4070 Super',
  'Intel Core i5-13600K',
  'ASUS TUF Gaming A15',
  'Lenovo IdeaPad 3',
  'Dell Inspiron 15',
  'Smart TV Samsung 55 4K',
  'Apple Watch Ultra 2',
  'Teclado Mecânico Redragon',
  'Mouse Logitech G502',
  'GoPro Hero 12',
  'Sony WH-1000XM5',
  'Roteador TP-Link AX3000',
  'Carregador Anker GaN 65W',
  'Power Bank 20000mAh',
  'Soundbar LG',
  'Xbox Series X',
  'Kindle Paperwhite',
  'RTX 4080 Super',
  'AMD Ryzen 9 7950X3D',
  'Intel Core i7-14700K',
  'Samsung Galaxy S23 FE',
  'Motorola Edge 40 Neo',
  'iPad Pro M2 11',
  'Dell XPS 13',
  'Lenovo Legion 5',
  'ASUS ROG Strix G15',
  'Acer Nitro 5',
  'Monitor Samsung Odyssey G5',
  'LG UltraGear 34 Ultrawide',
  'Sony PlayStation 5 Slim',
  'Nintendo Switch OLED',
  'Controle Xbox Elite',
  'Apple Watch Series 9',
  'Samsung Galaxy Watch 6',
  'Sony WF-1000XM5',
  'Headset HyperX Cloud II',
  'Webcam Logitech C920',
  'Placa Mãe B650M',
  'Fonte Corsair 750W',
  'Memória RAM DDR5 64GB',
  'SSD SATA 500GB',
  'Gabinete Gamer Lian Li',
  'Cadeira Gamer ThunderX3',
  'Microfone Blue Yeti',
  'Ring Light 10 Polegadas',
  'Tripé para Câmera',
  'Filtro de Linha',
  'Nobreak APC 600VA',
];

const benefits = [
  { icon: Search, title: 'Compare em segundos', desc: 'Busque um produto e veja preços de várias lojas de uma vez.' },
  { icon: ShieldCheck, title: 'Lojas verificadas', desc: 'Todas as lojas são avaliadas e monitoradas constantemente.' },
  { icon: Wallet, title: 'Economize de verdade', desc: 'Encontre o menor preço com frete incluído em poucos cliques.' },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-gray-100 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-primary-600 rounded-lg p-1.5">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
<span className="text-xl font-bold text-gray-900 dark:text-slate-100 tracking-tight">Third Eye</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 dark:from-primary-900/20 via-white dark:via-slate-900 to-emerald-50/30 dark:to-emerald-900/10" />
        <div className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-primary-100 dark:border-primary-800">
              <Clock className="w-3.5 h-3.5" />
              Preços atualizados hoje
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-slate-100 mb-4 tracking-tight leading-tight">
              Compare preços de<br />
              <span className="text-primary-600 dark:text-primary-400">eletrônicos</span> em segundos
            </h1>
            <p className="text-base sm:text-lg text-gray-500 dark:text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
              Encontre as melhores ofertas de tecnologia em um só lugar.
              Economize tempo e dinheiro comparando preços reais com frete incluso.
            </p>
            <div className="max-w-xl mx-auto">
              <SearchBar variant="hero" />
            </div>

            {/* Trending */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-medium text-gray-400 dark:text-slate-500">Buscas populares:</span>
              {trending.map((term) => (
                <button
                  key={term}
                  onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
                  className="text-xs bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 hover:border-primary-300 dark:hover:border-primary-500 hover:text-primary-700 dark:hover:text-primary-400 text-gray-600 dark:text-slate-300 px-3.5 py-1.5 rounded-full transition-all shadow-sm hover:shadow-soft font-medium"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <Card key={b.title} padding="lg" className="text-center sm:text-left">
                <div className="bg-primary-50 dark:bg-primary-900/30 rounded-xl p-3 w-fit mx-auto sm:mx-0 mb-4">
                  <b.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-slate-100 mb-1.5">{b.title}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">{b.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2">Categorias em destaque</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400">Explore os produtos mais buscados da semana</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => navigate(`/search?q=${encodeURIComponent(cat.query)}`)}
                className="group"
              >
                <Card padding="lg" hover className="flex flex-col items-center gap-4 h-full">
                  <div className="bg-primary-50 dark:bg-primary-900/30 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 rounded-2xl p-3.5 transition-colors">
                    <cat.icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-slate-100 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                    {cat.label}
                  </span>
                </Card>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="bg-primary-600 rounded-lg p-1">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
<span className="text-lg font-bold text-gray-900 dark:text-slate-100">Third Eye</span>
          </div>
          <p className="text-xs text-gray-400 dark:text-slate-500">
            Comparador de preços de eletrônicos. Dados simulados para demonstração.
          </p>
        </div>
      </footer>
    </div>
  );
}

