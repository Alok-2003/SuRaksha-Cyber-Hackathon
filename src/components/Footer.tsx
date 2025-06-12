import { Globe, Shield } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">SecureLink</h3>
              <p className="text-sm text-slate-400">Your Data, Your Rules, Our Protection 

</p>
            </div>
          </div>
          <p className="text-slate-400 mb-6 max-w-md">
            The most advanced data privacy and compliance platform for modern fintech companies. 
            Protect your data, ensure compliance, and build trust with your customers.
          </p>
          <div className="flex items-center space-x-4">
            <Globe className="w-5 h-5 text-slate-400" />
            <span className="text-slate-400">Available globally with local compliance</span>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
        <p className="text-slate-400 text-sm">
          © 2024 SecureLink. All rights reserved.
        </p>
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
          <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</a>
          <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Security</a>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer