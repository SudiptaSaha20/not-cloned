import React, { useState } from 'react';
import { Calendar, Clock, Star, MapPin, Search, Filter, User, MessageCircle, BookOpen, Palette, Music, Monitor, Heart, ChevronRight, Menu, X } from 'lucide-react';

const CommunitySkillsPlatform = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const skillCategories = [
    { id: 'education', name: 'Education & Tutoring', icon: BookOpen, color: 'from-purple-300 to-purple-400', count: 45 },
    { id: 'arts', name: 'Arts & Crafts', icon: Palette, color: 'from-purple-400 to-purple-600', count: 32 },
    { id: 'music', name: 'Music & Performance', icon: Music, color: 'from-purple-600 to-purple-800', count: 28 },
    { id: 'digital', name: 'Digital & Tech Help', icon: Monitor, color: 'from-purple-800 to-orange-300', count: 56 },
  ];

  const featuredSkills = [
    {
      id: 1,
      name: 'Sarah Chen',
      skill: 'Watercolor Painting',
      category: 'arts',
      rating: 4.9,
      reviews: 127,
      price: '$25/hour',
      location: 'Downtown',
      availability: 'Available today',
      description: 'Professional artist with 15+ years of experience teaching watercolor techniques to all skill levels.',
      specialties: ['Landscapes', 'Portraits', 'Abstract'],
      experience: '15 years teaching',
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      skill: 'Guitar Lessons',
      category: 'music',
      rating: 4.8,
      reviews: 89,
      price: '$30/hour',
      location: 'Westside',
      availability: 'Next available: Tomorrow',
      description: 'Former music teacher specializing in acoustic and electric guitar for beginners to intermediate players.',
      specialties: ['Acoustic Guitar', 'Rock', 'Blues'],
      experience: '20 years teaching',
    },
    {
      id: 3,
      name: 'Emily Watson',
      skill: 'Math Tutoring',
      category: 'education',
      rating: 5.0,
      reviews: 156,
      price: '$35/hour',
      location: 'Central',
      availability: 'Available this week',
      description: 'Retired high school math teacher helping students excel in algebra, geometry, and calculus.',
      specialties: ['Algebra', 'Calculus', 'SAT Prep'],
      experience: '30 years teaching',
    },
    {
      id: 4,
      name: 'David Kim',
      skill: 'Smartphone & Computer Help',
      category: 'digital',
      rating: 4.7,
      reviews: 203,
      price: '$20/hour',
      location: 'Online/In-person',
      availability: 'Available now',
      description: 'Tech enthusiast helping seniors and beginners navigate smartphones, computers, and digital apps.',
      specialties: ['Smartphones', 'Video Calls', 'Email Setup'],
      experience: '5 years helping',
    },
  ];

  const filteredSkills = featuredSkills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         skill.skill.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const BookingModal = ({ skill, onClose }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [sessionType, setSessionType] = useState('individual');

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-purple-900">Book a Session</h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-purple-100 rounded-lg">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {skill.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-purple-900">{skill.name}</p>
                  <p className="text-sm text-purple-600">{skill.skill}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2">Session Type</label>
                <select 
                  value={sessionType} 
                  onChange={(e) => setSessionType(e.target.value)}
                  className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option value="individual">Individual Session</option>
                  <option value="group">Group Workshop</option>
                  <option value="online">Online Session</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2">Preferred Date</label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2">Preferred Time</label>
                <select 
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option value="">Select time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="19:00">7:00 PM</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={onClose}
                  className="flex-1 py-3 px-4 border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all">
                  Book Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SkillProfile = ({ skill, onBack }) => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 mb-6 transition-colors"
        >
          <ChevronRight className="rotate-180" size={20} />
          <span>Back to Skills</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                {skill.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{skill.name}</h1>
                <p className="text-xl text-purple-100 mb-2">{skill.skill}</p>
                <div className="flex items-center space-x-4 text-purple-100">
                  <div className="flex items-center space-x-1">
                    <Star className="fill-current" size={16} />
                    <span>{skill.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{skill.reviews} reviews</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} />
                    <span>{skill.location}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{skill.price}</div>
                <div className="text-purple-200">{skill.availability}</div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-purple-900 mb-4">About</h2>
                <p className="text-gray-700 mb-6">{skill.description}</p>

                <h3 className="text-xl font-semibold text-purple-900 mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {skill.specialties.map((specialty, index) => (
                    <span key={index} className="px-3 py-1 bg-gradient-to-r from-purple-300 to-purple-400 text-white rounded-full text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-purple-900 mb-3">Experience</h3>
                <p className="text-gray-700">{skill.experience}</p>
              </div>

              <div className="space-y-4">
                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-purple-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button 
                      onClick={() => setSelectedSkill(skill)}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
                    >
                      <Calendar className="inline mr-2" size={16} />
                      Book Session
                    </button>
                    <button className="w-full py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                      <MessageCircle className="inline mr-2" size={16} />
                      Send Message
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-purple-300 p-4 rounded-xl">
                  <h4 className="font-medium text-purple-900 mb-2">Response Time</h4>
                  <p className="text-sm text-gray-600">Usually responds within 2 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                <Heart className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-purple-900">SkillConnect</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-purple-600 hover:text-purple-800 transition-colors">Browse Skills</a>
              <a href="#" className="text-purple-600 hover:text-purple-800 transition-colors">Become a Teacher</a>
              <a href="#" className="text-purple-600 hover:text-purple-800 transition-colors">How it Works</a>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all">
                Sign Up
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} className="text-purple-600" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-purple-300">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <a href="#" className="block py-2 text-purple-600">Browse Skills</a>
            <a href="#" className="block py-2 text-purple-600">Become a Teacher</a>
            <a href="#" className="block py-2 text-purple-600">How it Works</a>
            <button className="w-full py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full">
              Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-300 via-purple-400 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Hidden Talents in Your Community
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
            Connect with skilled neighbors, learn new crafts, and share your expertise with others. 
            Building stronger communities through knowledge sharing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentView('browse')}
              className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Find a Teacher
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all">
              Share Your Skills
            </button>
          </div>
        </div>
      </section>

      {/* Skill Categories */}
      <section className="py-16 bg-gradient-to-br from-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
              Explore Skill Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From traditional crafts to digital literacy, discover the diverse talents in your neighborhood
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCurrentView('browse');
                  }}
                >
                  <div className={`bg-gradient-to-br ${category.color} p-8 rounded-2xl text-white shadow-lg hover:shadow-xl`}>
                    <IconComponent size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-purple-100 mb-4">{category.count} available teachers</p>
                    <ChevronRight className="ml-auto group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
              Featured Community Teachers
            </h2>
            <p className="text-xl text-gray-600">
              Meet some of the amazing skilled individuals in your area
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSkills.map((skill) => (
              <div
                key={skill.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer group transform hover:scale-105"
                onClick={() => setCurrentView({ type: 'profile', skill })}
              >
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-white font-bold">
                      {skill.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-900 group-hover:text-purple-600 transition-colors">
                        {skill.name}
                      </h3>
                      <p className="text-sm text-gray-600">{skill.skill}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="fill-purple-600 text-purple-600" size={14} />
                      <span>{skill.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{skill.reviews} reviews</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-purple-600 font-semibold">{skill.price}</span>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <MapPin size={14} />
                      <span>{skill.location}</span>
                    </div>
                  </div>

                  <div className="text-sm text-green-600 mb-4">{skill.availability}</div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSkill(skill);
                    }}
                    className="w-full py-2 bg-gradient-to-r from-purple-300 to-purple-400 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    Book Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-800 to-orange-300">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Share Your Skills?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join our community of teachers and make a difference in someone's learning journey
          </p>
          <button className="px-8 py-4 bg-white text-purple-800 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
            Become a Community Teacher
          </button>
        </div>
      </section>
    </div>
  );

  const BrowseSkills = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => setCurrentView('home')}
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors"
          >
            <ChevronRight className="rotate-180" size={20} />
            <span>Back to Home</span>
          </button>
          <h1 className="text-3xl font-bold text-purple-900">Browse Community Skills</h1>
          <div></div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search skills or teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Categories</option>
                {skillCategories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer group transform hover:scale-105"
              onClick={() => setCurrentView({ type: 'profile', skill })}
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-white font-bold">
                    {skill.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-900 group-hover:text-purple-600 transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-600">{skill.skill}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4">{skill.description}</p>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="fill-purple-600 text-purple-600" size={14} />
                    <span>{skill.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{skill.reviews} reviews</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-purple-600 font-semibold text-lg">{skill.price}</span>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <MapPin size={14} />
                    <span>{skill.location}</span>
                  </div>
                </div>

                <div className="text-sm text-green-600 mb-4">{skill.availability}</div>

                <div className="flex space-x-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentView({ type: 'profile', skill });
                    }}
                    className="flex-1 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm"
                  >
                    View Profile
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSkill(skill);
                    }}
                    className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:shadow-lg transition-all text-sm"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No skills found matching your search.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {currentView === 'home' && <HomePage />}
      {currentView === 'browse' && <BrowseSkills />}
      {currentView.type === 'profile' && (
        <SkillProfile 
          skill={currentView.skill} 
          onBack={() => setCurrentView('browse')} 
        />
      )}
      {selectedSkill && (
        <BookingModal 
          skill={selectedSkill} 
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </div>
  );
};

export default CommunitySkillsPlatform;