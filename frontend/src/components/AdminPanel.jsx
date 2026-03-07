import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';

const API = API_BASE;

export default function AdminPanel({ user }) {
    const [activeTab, setActiveTab] = useState('overview');

    // Stats and mock data
    const [stats, setStats] = useState({
        students: 450,
        teachers: 25,
        activeToday: 120,
        lessons: 85
    });

    const mockUsers = [
        { _id: '1', name: 'Aarav Sharma', role: 'student', details: 'Class 8A', joined: '2023-01-15', status: 'Active' },
        { _id: '2', name: 'Instructor Sharma', role: 'teacher', details: 'Mathematics', joined: '2022-08-01', status: 'Active' },
        { _id: '3', name: 'Simran Kaur', role: 'student', details: 'Class 8A', joined: '2023-02-10', status: 'Active' },
        { _id: '4', name: 'Manish Gupta', role: 'teacher', details: 'Science', joined: '2022-08-05', status: 'Active' },
        { _id: '5', name: 'Priya Patel', role: 'student', details: 'Class 9B', joined: '2023-01-20', status: 'Inactive' },
    ];

    const Header = ({ title }) => (
        <div className="pt-8 pb-4 px-6 fixed top-0 w-full max-w-md bg-slate-950/80 backdrop-blur-md z-40 border-b border-white/5">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-white">{title}</h1>
                    <p className="text-xs text-emerald-400 font-semibold mt-0.5">Govt. School, Nabha • Admin</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-900/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                    {user?.name?.charAt(0) || 'A'}
                </div>
            </div>
        </div>
    );

    const BottomNav = () => (
        <div className="fixed bottom-0 w-full max-w-md bg-slate-900/95 backdrop-blur-md border-t border-white/5 z-50">
            <div className="flex justify-between px-6 py-3">
                {[
                    { id: 'overview', icon: '🏠', label: 'Overview' },
                    { id: 'users', icon: '👥', label: 'Users' },
                    { id: 'content', icon: '📁', label: 'Content' },
                    { id: 'reports', icon: '📊', label: 'Reports' }
                ].map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex flex-col items-center">
                        <span className={`text-xl mb-1 ${activeTab === tab.id ? 'opacity-100 scale-110' : 'opacity-40 grayscale'} transition-all`}>{tab.icon}</span>
                        <span className={`text-[10px] font-bold ${activeTab === tab.id ? 'text-emerald-400' : 'text-slate-500'}`}>{tab.label}</span>
                        {activeTab === tab.id && <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1" />}
                    </button>
                ))}
            </div>
        </div>
    );

    const OverviewTab = () => (
        <div className="p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: 'Total Students', value: stats.students, color: 'text-indigo-400', bg: 'bg-indigo-900/20' },
                    { label: 'Total Teachers', value: stats.teachers, color: 'text-violet-400', bg: 'bg-violet-900/20' },
                    { label: 'Active Today', value: stats.activeToday, color: 'text-emerald-400', bg: 'bg-emerald-900/20' },
                    { label: 'Lessons Published', value: stats.lessons, color: 'text-amber-400', bg: 'bg-amber-900/20' },
                ].map((stat, i) => (
                    <div key={i} className={`p-4 rounded-3xl border border-white/5 ${stat.bg}`}>
                        <p className="text-xs font-bold text-slate-400 mb-1">{stat.label}</p>
                        <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* System Health */}
            <div className="bg-slate-900 rounded-3xl p-5 border border-white/5">
                <h3 className="text-sm font-bold text-white mb-4 flex justify-between">
                    <span>System Health</span>
                    <span className="text-xs text-slate-400 font-normal">Updated Just Now</span>
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-300">API Server</span>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div><span className="font-semibold text-emerald-400">Online</span></div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-300">Database</span>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div><span className="font-semibold text-emerald-400">Online</span></div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1.5"><span className="text-slate-300">Storage Usage</span><span className="font-semibold">2.4 GB / 10 GB</span></div>
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500" style={{ width: '24%' }}></div>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 text-center pt-2">Last backup: Today, 3:00 AM</p>
                </div>
            </div>

            {/* Recent Registrations */}
            <div className="bg-slate-900 rounded-3xl p-5 border border-white/5">
                <h3 className="text-sm font-bold text-white mb-4">Recent Registrations</h3>
                <div className="space-y-3">
                    {mockUsers.slice(0, 3).map((u, i) => (
                        <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-slate-950/50">
                            <div>
                                <p className="text-sm font-bold text-slate-200">{u.name}</p>
                                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-0.5">{u.role}</p>
                            </div>
                            <span className="text-xs font-semibold text-slate-400">{u.joined}</span>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 py-3 bg-slate-800 rounded-xl text-xs font-bold text-white hover:bg-slate-700 transition">View All Users</button>
            </div>
        </div>
    );

    const UsersTab = () => {
        const [filter, setFilter] = useState('all');
        const [search, setSearch] = useState('');

        const filtered = mockUsers.filter(u => {
            if (filter !== 'all' && u.role !== filter) return false;
            if (search && !u.name.toLowerCase().includes(search.toLowerCase())) return false;
            return true;
        });

        return (
            <div className="p-6 space-y-6">
                {/* Actions */}
                <div className="flex gap-2">
                    <button className="flex-1 py-3 bg-emerald-600 rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/20 active:scale-95 transition-all text-white">+ Add User</button>
                    <button className="flex-1 py-3 bg-slate-800 border border-white/5 rounded-xl text-sm font-bold active:scale-95 transition-all">Bulk Upload</button>
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                    {['all', 'student', 'teacher'].map(f => (
                        <button key={f} onClick={() => setFilter(f)} className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-colors ${filter === f ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                            {f}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <input type="text" placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)}
                    className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none" />

                {/* User List */}
                <div className="space-y-3">
                    {filtered.map((u, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-slate-900 border border-white/5">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="text-sm font-bold text-white">{u.name}</h4>
                                    <p className="text-xs text-slate-400 mt-0.5">{u.details}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${u.role === 'teacher' ? 'bg-violet-900/30 text-violet-400' : 'bg-indigo-900/30 text-indigo-400'}`}>
                                    {u.role}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                                <span className={`flex items-center gap-1.5 text-xs font-semibold ${u.status === 'Active' ? 'text-emerald-400' : 'text-red-400'}`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
                                    {u.status}
                                </span>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1.5 bg-slate-800 rounded-lg text-xs font-bold hover:bg-slate-700">Edit</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && <div className="text-center py-10 text-slate-500 font-semibold text-sm">No users found.</div>}
                </div>
            </div>
        );
    };

    const ContentTab = () => (
        <div className="p-6 space-y-6">
            <div className="bg-slate-900 p-5 rounded-3xl border border-white/5">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-white">Digital Literacy Modules</h3>
                    <button className="text-xs font-bold text-indigo-400 bg-indigo-900/30 px-3 py-1.5 rounded-lg">+ New</button>
                </div>
                <div className="space-y-3">
                    <div className="p-3 bg-slate-950/50 rounded-xl border border-white/5 flex justify-between items-center">
                        <div>
                            <p className="text-sm font-bold">1. Computer Basics</p>
                            <p className="text-xs text-slate-400">Available to all students</p>
                        </div>
                        <span className="text-xs font-bold text-emerald-400">Published</span>
                    </div>
                    <div className="p-3 bg-slate-950/50 rounded-xl border border-white/5 flex justify-between items-center">
                        <div>
                            <p className="text-sm font-bold">2. Internet Safety</p>
                            <p className="text-xs text-slate-400">Available to all students</p>
                        </div>
                        <span className="text-xs font-bold text-emerald-400">Published</span>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 p-5 rounded-3xl border border-white/5">
                <h3 className="text-sm font-bold text-white mb-4">Content Localization Status</h3>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-xs mb-1.5"><span className="text-slate-300">English</span><span className="font-semibold text-emerald-400">100% Complete</span></div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: '100%' }}></div></div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1.5"><span className="text-slate-300">Punjabi (ਪੰਜਾਬੀ)</span><span className="font-semibold text-amber-400">65% Complete</span></div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-amber-500" style={{ width: '65%' }}></div></div>
                    </div>
                    <div>
                        <div className="flex justify-between text-xs mb-1.5"><span className="text-slate-300">Hindi (हिंदी)</span><span className="font-semibold text-red-400">20% Complete</span></div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-red-500" style={{ width: '20%' }}></div></div>
                    </div>
                </div>
                <button className="w-full mt-5 py-3 bg-slate-800 rounded-xl text-xs font-bold text-white hover:bg-slate-700 transition">Manage Translations</button>
            </div>
        </div>
    );

    const ReportsTab = () => (
        <div className="p-6 space-y-6">
            <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 p-6 rounded-3xl border border-indigo-500/20">
                <h3 className="text-lg font-black text-white mb-1">School Performance</h3>
                <p className="text-xs text-indigo-300 mb-6">Aggregate across all grades & subjects</p>

                <div className="flex items-end gap-3 h-32 mb-4">
                    {/* Mock Bar Chart */}
                    {[40, 65, 55, 80, 72, 90, 85].map((h, i) => (
                        <div key={i} className="flex-1 bg-indigo-600/50 rounded-t-md relative group hover:bg-indigo-500 transition-colors" style={{ height: `${h}%` }}>
                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">{h}%</div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1 uppercase">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-slate-900 rounded-2xl border border-white/5 text-left hover:bg-slate-800 transition">
                    <span className="text-2xl mb-2 block">📄</span>
                    <span className="text-sm font-bold text-white block">Teacher Activity</span>
                    <span className="text-xs text-slate-400">Export CSV</span>
                </button>
                <button className="p-4 bg-slate-900 rounded-2xl border border-white/5 text-left hover:bg-slate-800 transition">
                    <span className="text-2xl mb-2 block">📶</span>
                    <span className="text-sm font-bold text-white block">Connectivity Log</span>
                    <span className="text-xs text-slate-400">View History</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 text-white flex justify-center pb-20 pt-20">
            <div className="w-full max-w-md bg-slate-950 relative min-h-screen shadow-2xl">
                <Header title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} />

                <div className="animate-fadeIn">
                    {activeTab === 'overview' && <OverviewTab />}
                    {activeTab === 'users' && <UsersTab />}
                    {activeTab === 'content' && <ContentTab />}
                    {activeTab === 'reports' && <ReportsTab />}
                </div>

                <BottomNav />
            </div>
        </div>
    );
}
