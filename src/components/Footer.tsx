import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-600 dark:bg-blue-800 py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-white dark:text-gray-200">
          © {new Date().getFullYear()} Vikrant Kumar. All rights reserved.
        </p>
        {/* <p className="text-xs text-blue-200 dark:text-blue-300 mt-2">
          This portfolio is a work in progress, showcasing my journey in web development and cybersecurity.
        </p> */}
      </div>
    </footer>
  )
}

export default Footer

