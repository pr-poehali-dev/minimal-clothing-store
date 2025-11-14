import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  sizes: string[];
  description: string;
}

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

const products: Product[] = [
  { id: 1, name: 'Минималистичная футболка', price: 2990, category: 'Футболки', image: 'https://cdn.poehali.dev/projects/272f059e-5095-44e4-89d4-7096bdb52e29/files/937572ce-5388-4217-aab9-3bba24c0b41d.jpg', sizes: ['XS', 'S', 'M', 'L', 'XL'], description: 'Базовая футболка из органического хлопка. Идеальная посадка, нейтральный цвет.' },
  { id: 2, name: 'Классические джинсы', price: 5990, category: 'Джинсы', image: 'https://cdn.poehali.dev/projects/272f059e-5095-44e4-89d4-7096bdb52e29/files/3d70b2de-35b4-4701-a2f8-de2a222121dd.jpg', sizes: ['28', '30', '32', '34', '36'], description: 'Прямой крой, универсальный деним. Подходит для любого случая.' },
  { id: 3, name: 'Лёгкая рубашка', price: 3990, category: 'Рубашки', image: 'https://cdn.poehali.dev/projects/272f059e-5095-44e4-89d4-7096bdb52e29/files/93d7eb7b-851c-48db-9c3c-7f6e3e55a07c.jpg', sizes: ['S', 'M', 'L', 'XL'], description: 'Льняная рубашка свободного кроя. Дышащая ткань для комфорта.' },
  { id: 4, name: 'Шерстяной свитер', price: 6990, category: 'Свитеры', image: 'https://cdn.poehali.dev/projects/272f059e-5095-44e4-89d4-7096bdb52e29/files/937572ce-5388-4217-aab9-3bba24c0b41d.jpg', sizes: ['S', 'M', 'L', 'XL'], description: 'Тёплый свитер из мериносовой шерсти. Минималистичный дизайн.' },
  { id: 5, name: 'Кожаная куртка', price: 12990, category: 'Верхняя одежда', image: 'https://cdn.poehali.dev/projects/272f059e-5095-44e4-89d4-7096bdb52e29/files/3d70b2de-35b4-4701-a2f8-de2a222121dd.jpg', sizes: ['S', 'M', 'L', 'XL'], description: 'Классическая куртка из натуральной кожи. Вечная классика.' },
  { id: 6, name: 'Хлопковые брюки', price: 4490, category: 'Брюки', image: 'https://cdn.poehali.dev/projects/272f059e-5095-44e4-89d4-7096bdb52e29/files/93d7eb7b-851c-48db-9c3c-7f6e3e55a07c.jpg', sizes: ['28', '30', '32', '34', '36'], description: 'Удобные брюки прямого кроя. Универсальный базовый элемент.' },
];

export default function Index() {
  const [currentPage, setCurrentPage] = useState<'home' | 'catalog' | 'cart' | 'contacts'>('home');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('');

  const addToCart = (product: Product, size: string) => {
    const existingItem = cart.find(item => item.id === product.id && item.selectedSize === size);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.selectedSize === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, selectedSize: size }]);
    }
    setQuickViewProduct(null);
    setSelectedSize('');
  };

  const removeFromCart = (id: number, size: string) => {
    setCart(cart.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const updateQuantity = (id: number, size: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id, size);
    } else {
      setCart(cart.map(item =>
        item.id === id && item.selectedSize === size ? { ...item, quantity } : item
      ));
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderHome = () => (
    <div className="min-h-screen">
      <div className="relative h-[70vh] bg-secondary flex items-center justify-center">
        <div className="text-center space-y-6 px-4">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">MINIMAL</h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light">Одежда без компромиссов</p>
          <Button onClick={() => setCurrentPage('catalog')} size="lg" className="mt-8">
            Смотреть коллекцию
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Избранное</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.slice(0, 3).map(product => (
            <div key={product.id} className="group cursor-pointer" onClick={() => setQuickViewProduct(product)}>
              <div className="aspect-[3/4] bg-secondary mb-4 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="font-semibold mb-1">{product.name}</h3>
              <p className="text-muted-foreground">{product.price.toLocaleString('ru-RU')} ₽</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCatalog = () => (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-12">Каталог</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <div key={product.id} className="group cursor-pointer" onClick={() => setQuickViewProduct(product)}>
            <div className="aspect-[3/4] bg-secondary mb-4 overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                  Быстрый просмотр
                </span>
              </div>
            </div>
            <Badge variant="secondary" className="mb-2">{product.category}</Badge>
            <h3 className="font-semibold mb-1">{product.name}</h3>
            <p className="text-muted-foreground">{product.price.toLocaleString('ru-RU')} ₽</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCart = () => (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-12">Корзина</h1>
      {cart.length === 0 ? (
        <div className="text-center py-20">
          <Icon name="ShoppingBag" size={64} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-xl text-muted-foreground mb-6">Корзина пуста</p>
          <Button onClick={() => setCurrentPage('catalog')}>Перейти в каталог</Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 pb-6 border-b">
                <div className="w-32 h-40 bg-secondary flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                  <p className="text-muted-foreground mb-3">Размер: {item.selectedSize}</p>
                  <p className="font-semibold mb-4">{item.price.toLocaleString('ru-RU')} ₽</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border">
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)} className="px-3 py-1 hover:bg-secondary">−</button>
                      <span className="px-4 py-1 border-x">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)} className="px-3 py-1 hover:bg-secondary">+</button>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id, item.selectedSize)}>
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-secondary p-8 h-fit">
            <h2 className="text-2xl font-bold mb-6">Итого</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Товары ({cartItemsCount})</span>
                <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between font-bold text-xl pt-4 border-t">
                <span>Всего</span>
                <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
            <Button className="w-full" size="lg">Оформить заказ</Button>
          </div>
        </div>
      )}
    </div>
  );

  const renderContacts = () => (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold mb-12">Контакты</h1>
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Адрес</h3>
              <p className="text-muted-foreground">Москва, ул. Примерная, 1</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Телефон</h3>
              <p className="text-muted-foreground">+7 (495) 123-45-67</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">info@minimal.store</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold mb-4">Напишите нам</h3>
            <Input placeholder="Ваше имя" />
            <Input type="email" placeholder="Email" />
            <Textarea placeholder="Сообщение" rows={4} />
            <Button className="w-full">Отправить</Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <header className="border-b sticky top-0 bg-background z-50">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => setCurrentPage('home')}>MINIMAL</h1>
          <nav className="hidden md:flex gap-8">
            <button onClick={() => setCurrentPage('home')} className="hover:text-muted-foreground transition-colors">Главная</button>
            <button onClick={() => setCurrentPage('catalog')} className="hover:text-muted-foreground transition-colors">Каталог</button>
            <button onClick={() => setCurrentPage('contacts')} className="hover:text-muted-foreground transition-colors">Контакты</button>
          </nav>
          <Button variant="ghost" size="icon" onClick={() => setCurrentPage('cart')} className="relative">
            <Icon name="ShoppingBag" size={20} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Button>
        </div>
      </header>

      {currentPage === 'home' && renderHome()}
      {currentPage === 'catalog' && renderCatalog()}
      {currentPage === 'cart' && renderCart()}
      {currentPage === 'contacts' && renderContacts()}

      <Dialog open={!!quickViewProduct} onOpenChange={() => { setQuickViewProduct(null); setSelectedSize(''); }}>
        <DialogContent className="max-w-4xl">
          {quickViewProduct && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-[3/4] bg-secondary">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <DialogHeader>
                  <DialogTitle className="text-3xl mb-2">{quickViewProduct.name}</DialogTitle>
                  <Badge variant="secondary" className="w-fit">{quickViewProduct.category}</Badge>
                </DialogHeader>
                <p className="text-2xl font-bold my-6">{quickViewProduct.price.toLocaleString('ru-RU')} ₽</p>
                <p className="text-muted-foreground mb-6">{quickViewProduct.description}</p>
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Выберите размер</h4>
                  <div className="flex gap-2 flex-wrap">
                    {quickViewProduct.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border transition-colors ${selectedSize === size ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <Button
                  size="lg"
                  className="mt-auto"
                  disabled={!selectedSize}
                  onClick={() => selectedSize && addToCart(quickViewProduct, selectedSize)}
                >
                  Добавить в корзину
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-12 text-center text-muted-foreground">
          <p>© 2024 MINIMAL. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}