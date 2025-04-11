# HomeNav-PRO

[![GitHub stars](https://img.shields.io/github/stars/Hmtgit7/HomeNav-PRO)](https://github.com/Hmtgit7/HomeNav-PRO/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Hmtgit7/HomeNav-PRO)](https://github.com/Hmtgit7/HomeNav-PRO/network/members)
[![GitHub issues](https://img.shields.io/github/issues/Hmtgit7/HomeNav-PRO)](https://github.com/Hmtgit7/HomeNav-PRO/issues)
[![GitHub license](https://img.shields.io/github/license/Hmtgit7/HomeNav-PRO)](https://github.com/Hmtgit7/HomeNav-PRO/blob/main/LICENSE)

> A modern, responsive e-commerce homepage with dark/light mode, advanced animations, and intuitive navigation for Shopify merchants

![HomeNav-PRO Preview](/api/placeholder/1200/630)

## ✨ Features

- **Responsive Design**: Mobile-friendly and optimized for all screen sizes
- **Dark/Light Mode**: Elegant theme toggle with system preference detection 
- **Advanced Animations**: Smooth transitions powered by Framer Motion
- **Interactive UI**: Dropdowns, carousels, modals, and more
- **Modular Architecture**: Component-based structure for easy customization
- **Accessible Components**: Built with web accessibility in mind
- **Performance Optimized**: Fast loading and rendering

## 🚀 Live Demo

[View Live Demo](https://homenav-pro.vercel.app) (Replace with your deployed URL)

## 🛠️ Technologies

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Hmtgit7/HomeNav-PRO.git

# Navigate to the project directory
cd HomeNav-PRO

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🧱 Project Structure

```
HomeNav-PRO/
├── public/               # Static assets
├── src/
│   ├── assets/           # Images and other assets
│   ├── components/       # React components
│   │   ├── client/       # Client-specific components
│   │   │   └── Homepage/ # Homepage sections
│   │   └── shared/       # Shared/reusable components
│   ├── context/          # React context definitions
│   ├── hooks/            # Custom React hooks
│   ├── App.jsx           # Main application component
│   ├── index.css         # Global styles and Tailwind imports
│   └── main.jsx          # Application entry point
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.js        # Vite configuration
```

## 📋 Key Components

### Shared Components

- **Navbar**: Navigation with dropdowns, search, and cart
- **Footer**: Site information and links
- **Carousel**: Reusable banner/content slider
- **CategoryCard**: Display category information
- **ThemeToggle**: Switch between light and dark mode
- **ScrollToTop**: Button to return to top of page
- **Loader**: Loading animation component

### Homepage Sections

- **BannerSection**: Hero carousel with CTA buttons
- **FeatureSection**: Key features overview
- **CategorySection**: Featured product categories
- **ProductShowcase**: Featured and new products with tabs
- **TestimonialSection**: Customer reviews slider
- **NewsletterSection**: Email subscription form

## 🔧 Customization

### Theme Colors

Modify the `tailwind.config.js` file to customize the color scheme:

```javascript
// tailwind.config.js
module.exports = {
  // ...
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#f9fafb',
          DEFAULT: '#4f46e5',
          dark: '#3730a3',
        },
        // Add your custom colors here
      },
    },
  },
  // ...
};
```

### Navigation Items

Update the `navigationItems` array in `src/components/shared/Navbar.jsx` to modify the navigation menu:

```javascript
const navigationItems = [
  {
    title: 'Products',
    submenu: [
      { name: 'New Arrivals', path: '/products/new' },
      // Add more items here
    ],
  },
  // Add more navigation sections here
];
```

## 📈 Performance

HomeNav-PRO is optimized for performance:

- Lazy loading of images and components
- Code splitting for faster initial load
- Efficient animation management
- Conditional rendering to minimize DOM operations
- Optimized Tailwind with PurgeCSS

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**[Hmtgit7](https://github.com/Hmtgit7)**

## 🙏 Acknowledgements

- [Unsplash](https://unsplash.com/) for stock images
- [Tailwind UI](https://tailwindui.com/) for design inspiration
- [React Icons](https://react-icons.github.io/react-icons/) for the icon set