@php
    $Cars = [
     
        [
            "navName" => "View Cars",
            "href" => route('voiture.index')
        ]
    ];
    $Marques = [
    
        [
            "navName" => "View Marques",
            "href" => route('marque.index')
        ]
    ];
    $Categories = [
   
        [
            "navName" => "View Categories",
            "href" => route('categorie.index')
        ]
    ];
@endphp
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title') - Cars Rental Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#f0f9ff',
                            100: '#e0f2fe',
                            200: '#bae6fd',
                            300: '#7dd3fc',
                            400: '#38bdf8',
                            500: '#0ea5e9',
                            600: '#0284c7',
                            700: '#0369a1',
                            800: '#075985',
                            900: '#0c4a6e',
                        }
                    }
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
        }
        
        .sidebar-item.active {
            background-color: rgba(255, 255, 255, 0.1);
            border-left: 4px solid #38bdf8;
        }
        
        .sidebar-icon {
            width: 20px;
            text-align: center;
            margin-right: 12px;
        }
        
        .fade-in {
            animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .notification {
            animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }

        /* Enhanced dropdown styles */
        .custom-dropdown {
            position: relative;
            cursor: pointer;
        }
        
        .dropdown-menu {
            position: absolute;
            left: 0;
            top: 100%;
            width: 100%;
            background-color: #1f2937;
            border-radius: 0.5rem;
            margin-top: 0.25rem;
            overflow: hidden;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.2s ease-in-out;
            z-index: 10;
        }
        
        .dropdown-menu.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .dropdown-item {
            padding: 0.75rem 1rem;
            transition: all 0.15s ease;
        }
        
        .dropdown-item:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }

        /* User dropdown */
        .user-dropdown {
            position: absolute;
            right: 0;
            top: 100%;
            width: 200px;
            margin-top: 0.5rem;
            background-color: white;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.2s ease-in-out;
            z-index: 50;
        }
        
        .user-dropdown.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        /* Progress tracker */
        .progress-container {
            height: 3px;
            width: 100%;
            background-color: #f3f4f6;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
        }
        
        .progress-bar {
            height: 3px;
            background-color: #0ea5e9;
            width: 0%;
            transition: width 0.2s ease-in-out;
        }

        /* Card hover effects */
        .dashboard-card {
            transition: all 0.3s ease;
        }
        
        .dashboard-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(-100%);
                position: fixed;
                z-index: 50;
                transition: transform 0.3s ease-in-out;
            }
            
            .sidebar.show {
                transform: translateX(0);
            }
            
            .overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 40;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease-in-out;
            }
            
            .overlay.show {
                opacity: 1;
                visibility: visible;
            }
        }

        .modal-backdrop {
            display: none;
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            z-index: 40;
        }

        .modal-content {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            z-index: 50;
        }

        .modal-active {
            display: block;
        }
    </style>
</head>
<body class="bg-gray-50">
    
    <!-- Mobile menu overlay -->
    <div class="overlay" id="sidebarOverlay"></div>
    
    <!-- Page load progress indicator -->
    <div class="progress-container">
        <div class="progress-bar" id="progressBar"></div>
    </div>


    <div class="flex h-screen">
        <!-- Sidebar -->
        <div class="w-64 bg-gray-900 text-white flex flex-col shadow-lg sidebar" id="sidebar">
            <div class="p-6 border-b border-gray-800">
                <div class="flex items-center space-x-3">
                    <i class="fas fa-car-side text-primary-400 text-2xl"></i>
                    <h1 class="text-xl font-bold tracking-wider">CARS RENTAL</h1>
                </div>
                <p class="text-xs text-gray-400 mt-1">Admin Dashboard</p>
            </div>
            
            <div class="flex-1 overflow-y-auto py-4">
                <nav class="px-3 space-y-1">
                    <a href="{{ route('admin.dashboard') }}" 
                       class="sidebar-item flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-all duration-200 group {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                        <span class="sidebar-icon"><i class="fas fa-tachometer-alt"></i></span>
                        <span class="group-hover:text-white">Dashboard</span>
                    </a>
                   
                   

                    <a
                     href="{{ route('categorie.index') }}" 
                    class="sidebar-item flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-all duration-200 group {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                     <span class="sidebar-icon"><i class="fas fa-tags"></i></span>
                     <span class="group-hover:text-white">Categories</span>
                 </a>

                   
                    <a 
                     href={{ route('marque.index') }}
                    class="sidebar-item flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-all duration-200 group {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                     <span class="sidebar-icon"><i class="fas fa-trademark"></i></span>
                     <span class="group-hover:text-white">Marques</span>
                 </a>

                    
                    <a href={{ route('voiture.index') }} 
                       class="sidebar-item flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-all duration-200 group">
                        <span class="sidebar-icon"><i class="fas fa-car"></i></span>
                        <span class="group-hover:text-white">Cars</span>
                    </a>
                    
                    <a href={{ route('reservation.index') }} 
                       class="sidebar-item flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-all duration-200 group">
                        <span class="sidebar-icon"><i class="fas fa-calendar-check"></i></span>
                        <span class="group-hover:text-white">Reservations</span>
                    </a>
                    
                    <a href={{ route('admin.client-activities') }}
                       class="sidebar-item flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-all duration-200 group">
                        <span class="sidebar-icon"><i class="fas fa-users"></i></span>
                        <span class="group-hover:text-white">Clients</span>
                    </a>

                    <a href={{ route('admin.analytics') }} 
                       class="sidebar-item flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-all duration-200 group">
                        <span class="sidebar-icon"><i class="fas fa-chart-line"></i></span>
                        <span class="group-hover:text-white">Analytics</span>
                    </a>

                    <a href="#" 
                       class="sidebar-item flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-all duration-200 group">
                        <span class="sidebar-icon"><i class="fas fa-cog"></i></span>
                        <span class="group-hover:text-white">Settings</span>
                    </a>
                </nav>
            </div>
            
            <div class="p-4 border-t border-gray-800">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                        <span class="text-white font-semibold">
                            {{ substr(auth()->user()->name ?? 'Admin', 0, 1) }}
                        </span>
                    </div>
                    <div>
                        <p class="text-sm font-medium text-white">{{ auth()->user()->name ?? 'Admin User' }}</p>
                        <p class="text-xs text-gray-400">Administrator</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Top Navigation -->
            <header class="bg-white shadow-sm">
                <div class="flex items-center justify-between px-6 py-4">
                    <div class="flex items-center">
                        <!-- Mobile menu toggle -->
                        <button id="sidebarToggle" class="mr-4 text-gray-500 hover:text-gray-700 focus:outline-none md:hidden">
                            <i class="fas fa-bars"></i>
                        </button>
                        
                        <h2 class="text-xl font-semibold text-gray-800">@yield('title')</h2>
                        <nav class="ml-6 flex items-center space-x-2 text-sm">
                            <a href="{{ route('admin.dashboard') }}" class="text-gray-500 hover:text-primary-600">Home</a>
                            <span class="text-gray-400">/</span>
                            <span class="text-gray-700">@yield('breadcrumb', 'Dashboard')</span>
                        </nav>
                    </div>
                    
                    <div class="flex items-center space-x-4">
                        <!-- Search button -->
                        <button type="button" id="searchToggle" class="text-gray-500 hover:text-gray-700 focus:outline-none">
                            <i class="fas fa-search"></i>
                        </button>
                        
                        <!-- Notifications -->
                        <div class="relative">
                            <button type="button" class="text-gray-500 hover:text-gray-700 focus:outline-none" id="notificationToggle">
                                <div class="relative">
                                    <i class="fas fa-bell"></i>
                                    <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                                </div>
                            </button>
                            <!-- Notifications dropdown -->
                            <div id="notificationsDropdown" class="user-dropdown w-72">
                                <div class="py-2 px-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                                    <h3 class="text-sm font-semibold">Notifications</h3>
                                    <button id="markAllAsRead" class="text-xs text-primary-600 hover:text-primary-700">Mark all as read</button>
                                </div>
                                <div class="max-h-64 overflow-y-auto" id="notificationsList">
                                    <!-- Notifications will be loaded here dynamically -->
                                    <div class="flex justify-center items-center py-8">
                                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                                    </div>
                                </div>
                                <div class="py-2 px-4 bg-gray-50 border-t border-gray-100 text-center">
                                    <a href="#" class="text-xs text-primary-600 font-medium">View all notifications</a>
                                </div>
                            </div>
                        </div>
                        
                        <!-- User Menu -->
                        <div class="relative">
                            <button type="button" class="text-gray-500 hover:text-gray-700 focus:outline-none" id="user-menu-button">
                                <i class="fas fa-user-circle text-xl"></i>
                            </button>
                            <!-- User dropdown menu -->
                            <div id="userDropdown" class="user-dropdown">
                                <div class="py-3 px-4 border-b border-gray-100">
                                    <div class="flex items-center">
                                        <div class="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center mr-3">
                                            <span class="text-white font-semibold">
                                                {{ substr(auth()->user()->name ?? 'Admin', 0, 1) }}
                                            </span>
                                        </div>
                                        <div>
                                            <p class="text-sm font-medium text-gray-900">{{ auth()->user()->name ?? 'Admin User' }}</p>
                                            <p class="text-xs text-gray-500">{{ auth()->user()->email ?? 'admin@example.com' }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="py-1">
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <i class="fas fa-user-cog mr-2 text-gray-500"></i> Profile Settings
                                    </a>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <i class="fas fa-lock mr-2 text-gray-500"></i> Change Password
                                    </a>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <i class="fas fa-cog mr-2 text-gray-500"></i> Preferences
                                    </a>
                                </div>
                                <div class="py-1 border-t border-gray-100">
                                    <form action="{{ route('logout') }}" method="POST" class="block">
                                        @csrf
                                        <button type="submit" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                            <i class="fas fa-sign-out-alt mr-2"></i> Logout
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Search overlay -->
                        <div id="searchOverlay" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center hidden">
                            <div class="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
                                <button id="closeSearch" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                                    <i class="fas fa-times"></i>
                                </button>
                                <h3 class="text-lg font-semibold mb-4">Search</h3>
                                <div class="relative">
                                    <input type="text" class="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="Search for cars, clients, reservations...">
                                    <i class="fas fa-search absolute left-3 top-3.5 text-gray-400"></i>
                                </div>
                                <div class="mt-4">
                                    <h4 class="text-xs font-semibold text-gray-500 uppercase mb-2">RECENT SEARCHES</h4>
                                    <div class="space-y-2">
                                        <div class="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                            <div class="flex items-center">
                                                <i class="fas fa-history text-gray-400 mr-2"></i>
                                                <span class="text-sm">BMW X5</span>
                                            </div>
                                            <button class="text-gray-400 hover:text-gray-600">
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </div>
                                        <div class="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                                            <div class="flex items-center">
                                                <i class="fas fa-history text-gray-400 mr-2"></i>
                                                <span class="text-sm">Active reservations</span>
                                            </div>
                                            <button class="text-gray-400 hover:text-gray-600">
                                                <i class="fas fa-times"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            <!-- Page Content -->
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                @if(session('success'))
                    <div class="notification mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded shadow-sm flex items-center justify-between">
                        <div class="flex items-center">
                            <i class="fas fa-check-circle mr-3 text-green-500"></i>
                            <span>{{ session('success') }}</span>
                        </div>
                        <button class="text-green-500 hover:text-green-700 notification-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                @endif
                
                @if(session('error'))
                    <div class="notification mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded shadow-sm flex items-center justify-between">
                        <div class="flex items-center">
                            <i class="fas fa-exclamation-circle mr-3 text-red-500"></i>
                            <span>{{ session('error') }}</span>
                        </div>
                        <button class="text-red-500 hover:text-red-700 notification-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                @endif
                
                <div class="fade-in">
                    @yield('content')
                </div>
            </main>
            
            <!-- Footer -->
            <footer class="bg-white border-t border-gray-200 py-4 px-6">
                <div class="flex justify-between items-center">
                    <p class="text-sm text-gray-500">
                        &copy; {{ date('Y') }} Cars Rental Admin. All rights reserved.
                    </p>
                    <p class="text-sm text-gray-500">
                        Version 1.0.0
                    </p>
                </div>
            </footer>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize page load progress bar
            const progressBar = document.getElementById('progressBar');
            progressBar.style.width = '100%';
            
            // Mobile sidebar toggle
            const sidebar = document.getElementById('sidebar');
            const sidebarToggle = document.getElementById('sidebarToggle');
            const sidebarOverlay = document.getElementById('sidebarOverlay');
            
            if (sidebarToggle) {
                sidebarToggle.addEventListener('click', function() {
                    sidebar.classList.toggle('show');
                    sidebarOverlay.classList.toggle('show');
                });
            }
            
            if (sidebarOverlay) {
                sidebarOverlay.addEventListener('click', function() {
                    sidebar.classList.remove('show');
                    sidebarOverlay.classList.remove('show');
                });
            }
            
            // Enhanced dropdowns
            const dropdowns = document.querySelectorAll('.custom-dropdown');
            dropdowns.forEach(dropdown => {
                const trigger = dropdown.querySelector('.sidebar-item');
                const menu = dropdown.querySelector('.dropdown-menu');
                const icon = dropdown.querySelector('.fa-chevron-down');
                
                trigger.addEventListener('click', function() {
                    // Close all other dropdowns
                    dropdowns.forEach(d => {
                        if (d !== dropdown) {
                            d.querySelector('.dropdown-menu').classList.remove('show');
                            d.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
                        }
                    });
                    
                    // Toggle current dropdown
                    menu.classList.toggle('show');
                    
                    // Rotate icon
                    if (menu.classList.contains('show')) {
                        icon.style.transform = 'rotate(180deg)';
                    } else {
                        icon.style.transform = 'rotate(0deg)';
                    }
                });
            });
            
            // User dropdown
            const userMenuButton = document.getElementById('user-menu-button');
            const userDropdown = document.getElementById('userDropdown');
            
            if (userMenuButton && userDropdown) {
                userMenuButton.addEventListener('click', function() {
                    userDropdown.classList.toggle('show');
                    
                    // Close notifications dropdown if open
                    if (notificationsDropdown) {
                        notificationsDropdown.classList.remove('show');
                    }
                });
            }
            
            // Notifications dropdown
            const notificationToggle = document.getElementById('notificationToggle');
            const notificationsDropdown = document.getElementById('notificationsDropdown');
            
            if (notificationToggle && notificationsDropdown) {
                notificationToggle.addEventListener('click', function() {
                    notificationsDropdown.classList.toggle('show');
                    
                    // Close user dropdown if open
                    if (userDropdown) {
                        userDropdown.classList.remove('show');
                    }
                });
            }
            
            // Close dropdowns when clicking outside
            document.addEventListener('click', function(event) {
                // User dropdown
                if (userDropdown && userMenuButton && !userMenuButton.contains(event.target) && !userDropdown.contains(event.target)) {
                    userDropdown.classList.remove('show');
                }
                
                // Notifications dropdown
                if (notificationsDropdown && notificationToggle && !notificationToggle.contains(event.target) && !notificationsDropdown.contains(event.target)) {
                    notificationsDropdown.classList.remove('show');
                }
                
                // Close custom dropdowns when clicking outside
                dropdowns.forEach(dropdown => {
                    const trigger = dropdown.querySelector('.sidebar-item');
                    const menu = dropdown.querySelector('.dropdown-menu');
                    const icon = dropdown.querySelector('.fa-chevron-down');
                    
                    if (menu.classList.contains('show') && !dropdown.contains(event.target)) {
                        menu.classList.remove('show');
                        icon.style.transform = 'rotate(0deg)';
                    }
                });
            });
            
            // Search overlay functionality
            const searchToggle = document.getElementById('searchToggle');
            const searchOverlay = document.getElementById('searchOverlay');
            const closeSearch = document.getElementById('closeSearch');
            
            if (searchToggle && searchOverlay) {
                searchToggle.addEventListener('click', function() {
                    searchOverlay.classList.remove('hidden');
                    setTimeout(() => {
                        const searchInput = searchOverlay.querySelector('input');
                        if (searchInput) {
                            searchInput.focus();
                        }
                    }, 100);
                });
            }
            
            if (closeSearch && searchOverlay) {
                closeSearch.addEventListener('click', function() {
                    searchOverlay.classList.add('hidden');
                });
                
                searchOverlay.addEventListener('click', function(event) {
                    if (event.target === searchOverlay) {
                        searchOverlay.classList.add('hidden');
                    }
                });
            }
            // Close search overlay with escape key
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && searchOverlay && !searchOverlay.classList.contains('hidden')) {
                    searchOverlay.classList.add('hidden');
                }
            });
            
            // Auto-dismiss notifications
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notification => {
                // Auto hide after 5 seconds
                setTimeout(() => {
                    notification.style.opacity = '0';
                    setTimeout(() => {
                        notification.style.display = 'none';
                    }, 300);
                }, 5000);
                
                // Manual close button
                const closeBtn = notification.querySelector('.notification-close');
                if (closeBtn) {
                    closeBtn.addEventListener('click', function() {
                        notification.style.opacity = '0';
                        setTimeout(() => {
                            notification.style.display = 'none';
                        }, 300);
                    });
                }
            });
            
            // Tooltip functionality
            const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
            tooltipTriggers.forEach(trigger => {
                const tooltipText = trigger.getAttribute('data-tooltip');
                const tooltip = document.createElement('div');
                tooltip.classList.add('absolute', 'bg-gray-800', 'text-white', 'text-xs', 'rounded', 'py-1', 'px-2', 'bottom-full', 'mb-2', 'opacity-0', 'pointer-events-none', 'transition-opacity', 'duration-200', 'whitespace-nowrap');
                tooltip.style.left = '50%';
                tooltip.style.transform = 'translateX(-50%)';
                tooltip.textContent = tooltipText;
                
                trigger.style.position = 'relative';
                trigger.appendChild(tooltip);
                
                trigger.addEventListener('mouseenter', () => {
                    tooltip.classList.remove('opacity-0');
                    tooltip.classList.add('opacity-100');
                });
                
                trigger.addEventListener('mouseleave', () => {
                    tooltip.classList.remove('opacity-100');
                    tooltip.classList.add('opacity-0');
                });
            });
            
            // Form validation styling enhancement
            const formInputs = document.querySelectorAll('input, select, textarea');
            formInputs.forEach(input => {
                input.addEventListener('invalid', function() {
                    input.classList.add('border-red-500', 'focus:ring-red-500');
                });
                
                input.addEventListener('input', function() {
                    if (input.validity.valid) {
                        input.classList.remove('border-red-500', 'focus:ring-red-500');
                        input.classList.add('border-gray-300', 'focus:ring-primary-500');
                    }
                });
            });
            
            // Table row hover effect
            const tableRows = document.querySelectorAll('tbody tr');
            tableRows.forEach(row => {
                row.classList.add('hover:bg-gray-50', 'transition-colors', 'duration-150');
            });
            
            // Card animations on page load
            const cards = document.querySelectorAll('.dashboard-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('opacity-100', 'translate-y-0');
                }, 100 * index);
            });
            
            // Initialize any data charts if they exist
            if (typeof Chart !== 'undefined') {
                const chartCanvases = document.querySelectorAll('[data-chart]');
                chartCanvases.forEach(canvas => {
                    // Initialize chart based on data attributes
                    const chartType = canvas.getAttribute('data-chart');
                    // Chart initialization code would go here
                });
            }
        });
    </script>
    
    @yield('scripts')
</body>
</html>