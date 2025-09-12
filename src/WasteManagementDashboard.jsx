import React, { useState } from 'react';
import { 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  CreditCard, 
  MessageSquare,
  Phone,
  MapPin,
  Calendar,
  Award,
  Trash2,
  DollarSign,
  Search
} from 'lucide-react';

const WasteManagementDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  // Sample user data with Indian context
  const users = [
    {
      id: 1,
      name: 'Sudipta',
      address: 'Bagbajar,Chandannagar, Hooghly',
      phone: '+91-98765-43210',
      status: 'warning',
      creditPoints: 85,
      monthlyCharge: 500.00, // ₹3,750 (approx $45 converted)
      discount: 15,
      lastPickup: '3 days ago',
      segregationScore: 65,
      violations: 2,
      wasteType: 'Mixed waste in organic bin',
      avatar: 'SU'
    },
    {
      id: 2,
      name: 'Uttiyo',
      address: 'Fatokgora,Chandannagar, Hooghly',
      phone: '+91-87654-32109',
      status: 'excellent',
      creditPoints: 245,
      monthlyCharge: 475.00, // ₹4,150 (approx $50 converted)
      discount: 25,
      lastPickup: '2 days ago',
      segregationScore: 95,
      violations: 0,
      wasteType: 'Perfect segregation',
      avatar: 'UT'
    },
    {
      id: 3,
      name: 'Subhajit',
      address: 'Court More,Chandannagar, Hooghly',
      phone: '+91-76543-21098',
      status: 'good',
      creditPoints: 180,
      monthlyCharge: 480.00, // ₹4,000 (approx $48 converted)
      discount: 20,
      lastPickup: '4 days ago',
      segregationScore: 88,
      violations: 0,
      wasteType: 'Good segregation practice',
      avatar: 'SB'
    },
    {
      id: 4,
      name: 'Luchi',
      address: 'Fatokgora,Chandannagar, Hooghly',
      phone: '+91-65432-10987',
      status: 'good',
      creditPoints: 195,
      monthlyCharge: 610.00, // ₹3,900 (approx $47 converted)
      discount: 22,
      lastPickup: '5 days ago',
      segregationScore: 90,
      violations: 0,
      wasteType: 'Consistent good practice',
      avatar: 'mw'
    }
  ];

  const penalties = [
    {
      id: 1,
      userId: 1,
      userName: 'Sudipta',
      violation: 'Improper waste segregation',
      amount: 580.00, // ₹2,080 (approx $25 converted)
      date: '2025-09-05',
      status: 'pending',
      description: 'Plastic waste found in organic bin'
    },
    {
      id: 2,
      userId: 1,
      userName: 'Uttiyo',
      violation: 'Late bin placement',
      amount: 530.00, // ₹830 (approx $10 converted)
      date: '2025-08-28',
      status: 'pending',
      description: 'Bin placed after collection time'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'warning': return 'text-red-400 bg-red-900/20';
      case 'excellent': return 'text-green-400 bg-green-900/20';
      case 'good': return 'text-blue-400 bg-blue-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'excellent': return <CheckCircle className="w-4 h-4" />;
      case 'good': return <Award className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const sendReminder = (user, type) => {
    alert(`${type} reminder sent to ${user.name} at ${user.phone}`);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Professional Navbar */}
      <nav className="bg-gray-800 border-b border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-600 rounded-lg">
                  <Trash2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Eco-Notify</h1>
                  <p className="text-sm text-gray-400">Municipal Management System</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 bg-gray-900 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-6 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
                  activeTab === 'dashboard' 
                    ? 'bg-green-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                User Dashboard
              </button>
              <button
                onClick={() => setActiveTab('penalties')}
                className={`px-6 py-2.5 rounded-md font-medium text-sm transition-all duration-200 relative ${
                  activeTab === 'penalties' 
                    ? 'bg-red-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                Penalties & Violations
                {penalties.filter(p => p.status === 'pending').length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {penalties.filter(p => p.status === 'pending').length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-6">
        {activeTab === 'dashboard' && (
          <div>
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Users</p>
                    <p className="text-3xl font-bold text-white">{users.length}</p>
                  </div>
                  <Users className="w-10 h-10 text-blue-400" />
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Warnings</p>
                    <p className="text-3xl font-bold text-red-400">
                      {users.filter(u => u.status === 'warning').length}
                    </p>
                  </div>
                  <AlertTriangle className="w-10 h-10 text-red-400" />
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Excellent Users</p>
                    <p className="text-3xl font-bold text-green-400">
                      {users.filter(u => u.status === 'excellent').length}
                    </p>
                  </div>
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Credit Points</p>
                    <p className="text-3xl font-bold text-purple-400">
                      {users.reduce((sum, user) => sum + user.creditPoints, 0)}
                    </p>
                  </div>
                  <Award className="w-10 h-10 text-purple-400" />
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="mb-6">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Users List */}
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={`bg-gray-800 rounded-xl p-6 border-2 transition-all ${
                    user.status === 'warning' 
                      ? 'border-red-500 bg-red-900/10' 
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{user.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(user.status)}`}>
                            {getStatusIcon(user.status)}
                            <span className="capitalize">{user.status}</span>
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm">{user.address}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-sm">{user.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span className="text-sm">Last Pickup: {user.lastPickup}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-400">Segregation Score:</span>
                              <span className={`font-semibold ${
                                user.segregationScore >= 90 ? 'text-green-400' : 
                                user.segregationScore >= 70 ? 'text-yellow-400' : 'text-red-400'
                              }`}>
                                {user.segregationScore}%
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-400">Credit Points:</span>
                              <span className="text-purple-400 font-semibold">{user.creditPoints}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-400">Monthly Charge:</span>
                              <div className="text-right">
                                <span className="text-gray-500 line-through text-sm">₹{user.monthlyCharge.toLocaleString('en-IN')}</span>
                                <span className="text-green-400 font-semibold ml-2">
                                  ₹{(user.monthlyCharge * (1 - user.discount / 100)).toLocaleString('en-IN', {maximumFractionDigits: 0})}
                                </span>
                                <span className="text-xs text-green-400 block">({user.discount}% off)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 p-3 bg-gray-700/50 rounded-lg">
                          <span className="text-sm text-gray-300">
                            <strong>Status Note:</strong> {user.wasteType}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      <button
                        onClick={() => sendReminder(user, 'SMS')}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors flex items-center space-x-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Send SMS</span>
                      </button>
                      <button
                        onClick={() => sendReminder(user, 'Call')}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors flex items-center space-x-2"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call User</span>
                      </button>
                      {user.status === 'warning' && (
                        <button
                          onClick={() => sendReminder(user, 'Warning')}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors flex items-center space-x-2"
                        >
                          <AlertTriangle className="w-4 h-4" />
                          <span>Send Warning</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'penalties' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Penalties & Violations</h2>
                <p className="text-gray-400">Manage outstanding penalties and violations</p>
              </div>
              <div className="bg-red-900/20 px-6 py-3 rounded-xl border border-red-500/30">
                <div className="text-center">
                  <p className="text-red-400 font-semibold text-lg">
                    ₹{penalties.reduce((sum, p) => sum + p.amount, 0).toLocaleString('en-IN')}
                  </p>
                  <p className="text-red-300 text-sm">Total Outstanding</p>
                </div>
              </div>
            </div>

            {selectedUser ? (
              // User Detail View
              <div className="mb-6">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center space-x-2"
                >
                  <span>← Back to Penalties List</span>
                </button>
                
                <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                  <div className="flex items-start space-x-6 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {selectedUser.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">{selectedUser.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300">{selectedUser.address}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300">{selectedUser.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300">Last Pickup: {selectedUser.lastPickup}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Segregation Score:</span>
                            <span className={`font-bold text-lg ${
                              selectedUser.segregationScore >= 90 ? 'text-green-400' : 
                              selectedUser.segregationScore >= 70 ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                              {selectedUser.segregationScore}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Credit Points:</span>
                            <span className="text-purple-400 font-bold text-lg">{selectedUser.creditPoints}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Violations:</span>
                            <span className="text-red-400 font-bold text-lg">{selectedUser.violations}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="space-y-4">
              {penalties.map((penalty) => (
                <div key={penalty.id} className="bg-gray-800 rounded-xl p-6 border-2 border-red-500/30 hover:border-red-500/50 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                          {users.find(u => u.id === penalty.userId)?.avatar}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{penalty.userName}</h3>
                          <span className="px-3 py-1 bg-red-900/30 text-red-400 rounded-full text-sm font-medium">
                            {penalty.status === 'pending' ? 'Payment Pending' : penalty.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            <span className="text-white font-medium">Violation</span>
                          </div>
                          <p className="text-gray-300 text-sm">{penalty.violation}</p>
                        </div>
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-white font-medium">Date</span>
                          </div>
                          <p className="text-gray-300 text-sm">{penalty.date}</p>
                        </div>
                        <div className="bg-gray-700/50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <DollarSign className="w-4 h-4 text-green-400" />
                            <span className="text-white font-medium">Penalty Amount</span>
                          </div>
                          <p className="text-green-400 font-bold text-lg">₹{penalty.amount.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-700/30 p-4 rounded-lg">
                        <p className="text-gray-300 text-sm">
                          <strong className="text-white">Description:</strong> {penalty.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-3 ml-6">
                      <button
                        onClick={() => setSelectedUser(users.find(u => u.id === penalty.userId))}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                      >
                        <Users className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <button
                        onClick={() => sendReminder(
                          users.find(u => u.id === penalty.userId), 
                          'Penalty Reminder'
                        )}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Send Reminder</span>
                      </button>
                      <button
                        onClick={() => alert(`Processing payment of ₹${penalty.amount.toLocaleString('en-IN')} for ${penalty.userName}`)}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Process Payment</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WasteManagementDashboard;