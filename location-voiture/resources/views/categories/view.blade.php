@extends('layouts.admin')

@section('title', 'Categories Management')
@section('breadcrumb', 'Categories List')

@section('content')
<div class="container mx-auto px-4 py-8">
    <!-- Page Header with Enhanced Gradient Background -->
    <div class="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl shadow-xl mb-10 transform transition-all duration-300 hover:scale-[1.01]">
        <div class="px-8 py-8">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                <div class="flex items-center space-x-4">
                    <div class="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                        <i class="fas fa-th-large text-white text-2xl"></i>
                    </div>
                    <div>
                        <h1 class="text-3xl font-bold text-white">Categories Inventory</h1>
                        <p class="text-blue-100 mt-1">Manage and organize your vehicle collection</p>
                    </div>
                </div>
                <a href="{{ route('categorie.create') }}" 
                   class="mt-6 md:mt-0 bg-white text-indigo-700 py-3 px-6 rounded-xl inline-flex items-center hover:bg-indigo-50 transition-all duration-300 font-medium shadow-lg group">
                    <i class="fas fa-plus mr-2 group-hover:scale-110 transition-transform duration-300"></i>
                    Add New Category
                </a>
            </div>
        </div>
    </div>
    
    <!-- Main Content Area -->
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <!-- Filters & Search Section -->
        <div class="bg-gray-50 p-6 border-b border-gray-100">
            <div class="flex flex-col md:flex-row md:items-end md:space-x-6">
                <div class="flex-1 mb-4 md:mb-0">
                    <label for="search" class="block text-sm font-semibold text-gray-700 mb-2">Search Categories</label>
                    <div class="relative">
                        <input type="search" id="search" placeholder="Search by name, description..." 
                               class="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-30 pl-12 py-3 transition-all duration-200">
                        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i class="fas fa-search text-gray-400"></i>
                        </div>
                    </div>
                </div>
                
                <!-- Enhanced Filter Dropdown -->
                <div class="w-full md:w-72">
                    <label for="sort" class="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                    <div class="relative">
                        <select id="sort" class="w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-30 py-3 pl-4 pr-10 appearance-none transition-all duration-200">
                            <option value="name_asc">Name (A-Z)</option>
                            <option value="name_desc">Name (Z-A)</option>
                            <option value="count_desc">Most Vehicles</option>
                            <option value="count_asc">Fewest Vehicles</option>
                            <option value="newest">Newest First</option>
                        </select>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                            <i class="fas fa-chevron-down text-gray-500"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Categories Grid with Enhanced Cards -->
        <div class="p-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                @forelse ($categories as $category)
                    <div class="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col group">
                        <!-- Category Image with Hover Effect -->
                        <div class="relative h-56 overflow-hidden bg-gray-50">
                            @if($category->image)
                                <img src="{{ asset('storage/' . $category->image) }}" 
                                     alt="{{ $category->nom_categorie }}" 
                                     class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500">
                            @else
                                <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                                    <i class="fas fa-th-large text-indigo-200 text-6xl transform group-hover:scale-110 transition-transform duration-300"></i>
                                </div>
                            @endif
                            
                            <!-- Enhanced Vehicle Count Badge -->
                            <div class="absolute top-4 right-4">
                                <span class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 backdrop-blur-sm shadow-sm">
                                    <i class="fas fa-car mr-2"></i> {{ $category->voitures->count() }} vehicles
                                </span>
                            </div>
                        </div>
                        
                        <!-- Category Content -->
                        <div class="p-6 flex-grow">
                            <h3 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-700 transition-colors duration-300">{{ $category->nom_categorie }}</h3>
                            <p class="text-gray-600 line-clamp-2 mb-4">{{ $category->description }}</p>
                            
                            <!-- Added Stats Row -->
                            <div class="grid grid-cols-2 gap-2 mb-3 mt-4">
                                <div class="bg-blue-50 rounded-lg p-2 text-center">
                                    <span class="text-xs text-gray-500 block">Created</span>
                                    <span class="text-sm font-medium text-gray-700">{{ $category->created_at->format('M d, Y') }}</span>
                                </div>
                                <div class="bg-indigo-50 rounded-lg p-2 text-center">
                                    <span class="text-xs text-gray-500 block">Status</span>
                                    <span class="text-sm font-medium text-indigo-700">Active</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Enhanced Action Footer -->
                        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                            <!-- View Vehicles Button -->
                            <a href={{ route('categorie.show',$category->id_categorie) }} class="text-sm font-medium text-indigo-600 hover:text-indigo-800 inline-flex items-center group/btn">
                                <i class="fas fa-eye mr-2 group-hover/btn:animate-pulse"></i> View Vehicles
                            </a>
                            
                            <!-- Action Buttons -->
                            <div class="flex space-x-3">
                                <form method="POST" 
                                      action="{{ route('categorie.destroy', $category->id_categorie) }}"
                                      class="inline"
                                      onsubmit="return confirm('Are you sure you want to delete this category? This will also delete all vehicles in this category.');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 p-2.5 rounded-lg transition-colors shadow-sm">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                @empty
                    <!-- Enhanced Empty State -->
                    <div class="col-span-full bg-white border border-gray-200 rounded-2xl shadow-md p-12 text-center">
                        <div class="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6 animate-pulse">
                            <i class="fas fa-th-large text-indigo-600 text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-semibold text-gray-900 mb-3">No categories found</h3>
                        <p class="text-gray-500 mb-8 max-w-md mx-auto">Add categories to organize your vehicle inventory and improve your management efficiency</p>
                        <a href="{{ route('categorie.create') }}" 
                           class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-colors shadow-lg">
                            <i class="fas fa-plus mr-2"></i>
                            Add New Category
                        </a>
                    </div>
                @endforelse
            </div>
            
            <!-- Added Pagination Section -->
            @if(isset($categories) && $categories->count() > 0 && method_exists($categories, 'links'))
            <div class="mt-8 pt-6 border-t border-gray-100">
                {{ $categories->links() }}
            </div>
            @endif
        </div>
    </div>
</div>

<!-- Enhanced Toast Message System -->
<div id="toast-container" class="fixed bottom-6 right-6 z-50"></div>

<script>
    // Enhanced Toast notification function
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        
        // Set classes based on type
        const baseClasses = 'flex items-center p-4 pr-6 rounded-xl shadow-xl transition-all duration-300 transform translate-y-10 opacity-0';
        const typeClasses = type === 'success' 
            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white' 
            : 'bg-gradient-to-r from-red-600 to-red-700 text-white';
            
        toast.className = `${baseClasses} ${typeClasses}`;
        
        // Icon based on type
        const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
        
        toast.innerHTML = `
            <div class="bg-white/20 p-2 rounded-lg mr-3">
                <i class="fas fa-${icon} text-white"></i>
            </div>
            <span class="font-medium">${message}</span>
            <button class="ml-auto text-white hover:text-gray-200 pl-4">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add to container
        toastContainer.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.classList.remove('translate-y-10', 'opacity-0');
        }, 10);
        
        // Handle close button
        toast.querySelector('button').addEventListener('click', () => {
            toast.classList.add('opacity-0', 'translate-y-10');
            setTimeout(() => {
                toast.remove();
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-10');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 5000);
    }
    
    // Example usage (uncomment to test)
    // setTimeout(() => {
    //     showToast('Category updated successfully', 'success');
    // }, 1000);
    
    // Enhanced Search functionality with debounce
    const searchInput = document.getElementById('search');
    let searchTimeout;
    
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase().trim();
            const categories = document.querySelectorAll('.grid > div:not(.col-span-full)');
            let foundCount = 0;
            
            categories.forEach(category => {
                const title = category.querySelector('h3').textContent.toLowerCase();
                const description = category.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm) || searchTerm === '') {
                    category.style.display = '';
                    category.classList.add('animate-fadeIn');
                    setTimeout(() => {
                        category.classList.remove('animate-fadeIn');
                    }, 300);
                    foundCount++;
                } else {
                    category.style.display = 'none';
                }
            });
            
            // Show message if no results
            const existingMessage = document.getElementById('no-results-message');
            if (foundCount === 0 && searchTerm !== '') {
                if (!existingMessage) {
                    const noResults = document.createElement('div');
                    noResults.id = 'no-results-message';
                    noResults.className = 'col-span-full py-8 text-center';
                    noResults.innerHTML = `
                        <div class="text-gray-500">
                            <i class="fas fa-search text-2xl mb-2 text-gray-400"></i>
                            <p>No categories found matching "<span class="font-medium">${searchTerm}</span>"</p>
                        </div>
                    `;
                    document.querySelector('.grid').appendChild(noResults);
                }
            } else if (existingMessage) {
                existingMessage.remove();
            }
        }, 300); // 300ms debounce
    });
    
    // Enhanced Sort functionality 
    document.getElementById('sort').addEventListener('change', function(e) {
        const sortValue = e.target.value;
        // This would typically be handled by reloading with new sort parameters
        // For demo purposes, we'd show a toast and add some animation
        
        // Add transition effect to cards
        const cards = document.querySelectorAll('.grid > div:not(.col-span-full)');
        cards.forEach(card => {
            card.style.opacity = '0.5';
            card.style.transform = 'scale(0.98)';
        });
        
        setTimeout(() => {
            cards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            });
            showToast(`Categories sorted by ${sortValue.replace('_', ' ')}`, 'success');
        }, 400);
    });
    
    // Add CSS for animations
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
                animation: fadeIn 0.3s ease-out forwards;
            }
            
            /* Enhance buttons with hover effects */
            a, button {
                transition: all 0.2s ease;
            }
            a:hover, button:hover {
                transform: translateY(-2px);
            }
            
            /* Enhance focus states */
            input:focus, select:focus {
                box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
            }
            
            /* Better card hover */
            .grid > div:not(.col-span-full):hover {
                transform: translateY(-5px);
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            }
        </style>
    `);
</script>
@endsection