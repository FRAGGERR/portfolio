# 🎨 Portfolio Customization Guide

## 📋 **FILES TO MODIFY (Priority Order)**

### **🔥 HIGH PRIORITY - Core Identity**

#### 1. **`src/config.js`** - Main Configuration

- **Email address**
- **Social media links** (GitHub, LinkedIn, Twitter, etc.)
- **Navigation links**
- **Color scheme** (optional)

#### 2. **`src/components/sections/hero.js`** - Landing Section

- **Your name**
- **Your tagline**
- **Current company/role**
- **Call-to-action button**

#### 3. **`src/components/sections/about.js`** - About Section

- **Personal story**
- **Work experience summary**
- **Skills list**
- **Recent projects**

#### 4. **`src/images/me.jpg`** - Profile Picture

- Replace with your professional photo

#### 5. **`package.json`** - Project Metadata

- **Author name and email**
- **Repository URL**

### **📁 CONTENT FILES**

#### 6. **`content/jobs/`** - Work Experience

- Create folders for each job
- Each job needs an `index.md` file with:

  ```markdown
  ---
  date: 'YYYY-MM-DD'
  title: 'Your Job Title'
  company: 'Company Name'
  location: 'City, State/Country'
  range: 'Month Year - Month Year'
  url: 'https://company-website.com'
  ---

  - Your responsibility 1
  - Your responsibility 2
  - Your responsibility 3
  ```

#### 7. **`content/projects/`** - Projects

- Create `.md` files for each project
- Each project needs:

  ```markdown
  ---
  date: 'YYYY-MM-DD'
  title: 'Project Name'
  github: 'https://github.com/yourusername/project'
  external: 'https://project-demo.com'
  tech:
    - React
    - Node.js
    - MongoDB
  showInProjects: true
  ---

  Project description here...
  ```

#### 8. **`content/featured/`** - Featured Projects

- Create folders for featured projects
- Each needs an `index.md` file with images
- Add project screenshots in the folder

### **🎨 OPTIONAL CUSTOMIZATION**

#### 9. **`src/styles/theme.js`** - Colors & Styling

- Customize color scheme
- Typography settings

#### 10. **`content/posts/`** - Blog Posts (Optional)

- Add blog posts if you want a blog section

## 🚀 **QUICK START CHECKLIST**

### **Phase 1: Basic Info (5 minutes)**

- [ ] Update `src/config.js` with your email and social links
- [ ] Update `src/components/sections/hero.js` with your name and tagline
- [ ] Replace `src/images/me.jpg` with your photo
- [ ] Update `package.json` author info

### **Phase 2: About Section (10 minutes)**

- [ ] Update `src/components/sections/about.js` with your story
- [ ] Modify skills list to match your expertise
- [ ] Update company links and descriptions

### **Phase 3: Content (30+ minutes)**

- [ ] Create job experience files in `content/jobs/`
- [ ] Create project files in `content/projects/`
- [ ] Add featured projects in `content/featured/`
- [ ] Add project images and screenshots

### **Phase 4: Polish (15 minutes)**

- [ ] Test all links work correctly
- [ ] Check mobile responsiveness
- [ ] Update meta tags and SEO info
- [ ] Test contact form functionality

## 📝 **CONTENT TEMPLATES**

### **Job Experience Template**

```markdown
---
date: '2023-01-15'
title: 'Senior Software Engineer'
company: 'Tech Company Inc.'
location: 'San Francisco, CA'
range: 'January 2023 - Present'
url: 'https://techcompany.com'
---

- Led development of customer-facing web applications using React and Node.js
- Mentored junior developers and conducted code reviews
- Implemented CI/CD pipelines reducing deployment time by 60%
- Collaborated with design team to improve user experience
```

### **Project Template**

```markdown
---
date: '2023-06-01'
title: 'E-Commerce Platform'
github: 'https://github.com/yourusername/ecommerce-app'
external: 'https://ecommerce-demo.com'
tech:
  - React
  - Node.js
  - MongoDB
  - Stripe
  - AWS
showInProjects: true
---

A full-stack e-commerce platform built with React and Node.js. Features include user authentication, product catalog, shopping cart, payment processing with Stripe, and admin dashboard for inventory management.
```

## 🎯 **MOST IMPORTANT FILES SUMMARY**

1. **`src/config.js`** - Your contact info and social links
2. **`src/components/sections/hero.js`** - Your name and main message
3. **`src/components/sections/about.js`** - Your story and skills
4. **`src/images/me.jpg`** - Your profile picture
5. **`content/jobs/`** - Your work experience
6. **`content/projects/`** - Your projects
7. **`content/featured/`** - Your best projects

## 💡 **PRO TIPS**

- **Keep it concise**: Focus on your best work, not everything
- **Use high-quality images**: For projects and your profile picture
- **Test all links**: Make sure everything works before deploying
- **Mobile-first**: Ensure it looks great on all devices
- **SEO friendly**: Use descriptive titles and meta descriptions
- **Regular updates**: Keep your portfolio current with new projects

## 🔧 **TECHNICAL NOTES**

- This is a **Gatsby.js** site
- Uses **Styled Components** for styling
- Content is in **Markdown** files
- Images should be optimized for web
- Supports **dark/light mode** (can be customized)

---

**Need help?** Check the original repository or Gatsby documentation for more advanced customization options.
