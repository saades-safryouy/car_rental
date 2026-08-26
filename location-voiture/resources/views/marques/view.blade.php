@extends('layouts.admin')

@section('title', 'Brands')

@section('styles')
<style>
    /* Card animations and effects */
    .brand-card {
        transition: all 0.3s ease;
        border: 1px solid rgba(226, 232, 240, 0.8);
    }
    
    .brand-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        border-color: rgba(191, 219, 254, 0.5);
    }
    
    /* Logo container styling */
    .logo-container {
        background: radial-gradient(circle, rgba(249, 250, 251, 1) 0%, rgba(241, 245, 249, 1) 100%);
        transition: all 0.3s ease;
    }
    
    .brand-card:hover .logo-container {
        background: radial-gradient(circle, rgba(243, 244, 246, 1) 0%, rgba(236, 241, 247, 1) 100%);
    }
    
    .brand-logo {
        transition: transform 0.4s ease;
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05));
    }
    
    .brand-card:hover .brand-logo {
        transform: scale(1.05);
    }
    
    /* Badge styling */
    .status-badge {
        transition: all 0.2s ease;
    }
    
    .brand-card:hover .status-badge {
        background-color: rgb(219, 234, 254);
    }
    
    /* Action buttons */
    .action-btn {
        transition: all 0.2s ease;
    }
    
    .action-btn:hover {
        transform: translateY(-2px);
    }
    
    /* Header animation */
    .page-header {
        background-size: 200% 200%;
        animation: gradientAnimation 15s ease infinite;
    }
    
    @keyframes gradientAnimation {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
    
    /* Alert animation */
    .alert-success {
        animation: fadeInDown 0.5s ease-out;
    }
    
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Empty state styling */
    .empty-state-container {
        background: linear-gradient(135deg, rgba(243, 244, 246, 0.8) 0%, rgba(249, 250, 251, 0.8) 100%);
        transition: all 0.3s ease;
    }
    
    .empty-state-container:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
    
    .empty-state-icon {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
    
    /* Search box styling */
    .search-input {
        transition: all 0.3s ease;
    }
    
    .search-input:focus {
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    }
    
    /* Sort dropdown styling */
    .sort-dropdown {
        position: relative;
    }
    
    .sort-menu {
        position: absolute;
        right: 0;
        top: 100%;
        z-index: 10;
        min-width: 12rem;
        margin-top: 0.5rem;
        transform-origin: top right;
        opacity: 0;
        transform: scale(0.95);
        pointer-events: none;
        transition: all 0.2s ease;
    }
    
    .sort-menu.active {
        opacity: 1;
        transform: scale(1);
        pointer-events: auto;
    }
    
    /* Delete confirmation modal */
    .confirm-modal-backdrop {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 40;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .confirm-modal-content {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.95);
        max-width: 400px;
        width: 90%;
        z-index: 50;
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .confirm-modal-backdrop.modal-active {
        display: block;
        opacity: 1;
    }
    
    .confirm-modal-content.modal-active {
        display: block;
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
</style>
@endsection

@section('content')
<div class="container mx-auto px-4 py-6">
    <!-- Page Header with Gradient Background -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg mb-8 page-header">
        <div class="px-6 py-8">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                <div class="flex items-center">
                    <div class="bg-white/20 p-3 rounded-lg mr-4">
                        <i class="fas fa-trademark text-white text-2xl"></i>
                    </div>
                    <div>
                        <h1 class="text-2xl font-bold text-white">Brands Management</h1>
                        <p class="text-blue-100 mt-1">Manage your vehicle brands collection</p>
                    </div>
                </div>
                <div class="mt-4 md:mt-0 flex space-x-3">
                    <a href="{{ route('marque.create') }}" 
                       class="bg-white text-blue-700 py-2 px-5 rounded-lg inline-flex items-center hover:bg-blue-50 transition-all duration-200 font-medium shadow-sm">
                        <i class="fas  fa-plus mr-2"></i>
                        Add New Brand
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- Controls and Filters -->
    <div class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <!-- Search Box -->
        <div class="relative w-full md:w-auto md:flex-grow md:max-w-md">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i class="fas fa-search text-gray-400"></i>
            </div>
            <input type="text" id="brandSearch" class="search-input bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search brands...">
        </div>
        
        <!-- Filters and Sort -->
        <div class="flex items-center space-x-3">
            <!-- Filter Dropdown -->
            <div class="relative">
                <button id="filterDropdownButton" class="inline-flex items-center text-gray-700 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2.5">
                    <i class="fas fa-filter mr-2 text-gray-500"></i>
                    Filters
                    <i class="fas fa-chevron-down ml-2 text-xs"></i>
                </button>
                
                <!-- Filter Dropdown Content - Implement as needed -->
            </div>
            
            <!-- Sort Dropdown -->
            <div class="relative sort-dropdown">
                <button id="sortDropdownButton" class="inline-flex items-center text-gray-700 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2.5">
                    <i class="fas fa-sort mr-2 text-gray-500"></i>
                    Sort
                    <i class="fas fa-chevron-down ml-2 text-xs"></i>
                </button>
                
                <div id="sortDropdownMenu" class="sort-menu hidden bg-white rounded-lg shadow-lg border border-gray-200">
                    <ul class="py-2 text-sm text-gray-700">
                        <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                                <i class="fas fa-sort-alpha-down mr-2"></i> Name (A-Z)
                            </a>
                        </li>
                        <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                                <i class="fas fa-sort-alpha-up mr-2"></i> Name (Z-A)
                            </a>
                        </li>
                        <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                                <i class="fas fa-car mr-2"></i> Most Vehicles
                            </a>
                        </li>
                        <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100">
                                <i class="fas fa-calendar mr-2"></i> Recently Added
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- Display Mode Toggle -->
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button type="button" id="gridViewBtn" class="px-3 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-l-lg hover:bg-blue-700 focus:z-10 focus:outline-none">
                    <i class="fas fa-th-large"></i>
                </button>
                <button type="button" id="listViewBtn" class="px-3 py-2.5 text-sm font-medium bg-white text-gray-700 rounded-r-lg border border-gray-300 hover:bg-gray-100 focus:z-10 focus:outline-none">
                    <i class="fas fa-list"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- Success Message -->
    @if(session('success'))
        <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg shadow-sm flex items-start alert-success">
            <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
            <div>
                <p class="font-medium">Success!</p>
                <p>{{ session('success') }}</p>
            </div>
            <button type="button" class="ml-auto text-green-500 hover:text-green-700" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    @endif

    <!-- Brands Grid -->
    <div id="brandsGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        @foreach($marques as $marque)
            <div class="bg-white rounded-xl shadow-md overflow-hidden brand-card">
                <!-- Brand Logo/Image -->
                <div class="relative h-48 overflow-hidden logo-container flex items-center justify-center">
                    @if($marque->logo)
                        <img src="{{ asset('storage/' . $marque->logo) }}" 
                             alt="{{ $marque->nom_marque }}"
                             class="object-contain p-4 max-h-36 brand-logo">
                    @else
                        <div class="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
                            <i class="fas fa-building text-blue-300 text-4xl"></i>
                        </div>
                    @endif
                    <!-- Brand Status Badge -->
                    <div class="absolute top-4 right-4">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 status-badge">
                            <span class="w-2 h-2 bg-blue-600 rounded-full mr-1.5"></span>
                            Active
                        </span>
                    </div>
                </div>
                
                <!-- Brand Content -->
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ $marque->nom_marque }}</h3>
                    
                    @if(isset($marque->description) && !empty($marque->description))
                        <p class="text-gray-600 mb-6 text-sm line-clamp-2">{{ Str::limit($marque->description, 100) }}</p>
                    @else
                        <div class="h-10"></div> <!-- Spacer for consistent card heights -->
                    @endif
                    
                    <div class="flex justify-between items-center pt-3 border-t border-gray-100">
                        <!-- Vehicle Count -->
                        <div class="flex items-center">
                            <span class="flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                                <i class="fas fa-car text-gray-500 mr-1.5"></i>
                                {{ $marque->voitures->count() }} {{ Str::plural('Vehicle', $marque->voitures->count()) }}
                            </span>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="flex space-x-2">
                            <button onclick="showDeleteModal({{ $marque->id_marque }}, '{{ $marque->nom_marque }}')" 
                                    class="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg transition-colors action-btn delete-brand" 
                                    data-id="{{ $marque->id_marque }}" title="Delete Brand">
                                <i class="fas fa-trash-alt"></i>
                            </button>                          
                            
                            <a href="{{ route('marque.show', $marque->id_marque) }}" 
                               class="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg transition-colors action-btn"
                               title="View Brand Details">
                                <i class="fas fa-eye"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
    
    <!-- Brands List View (Hidden by default) -->
    <div id="brandsList" class="hidden">
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicles</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @foreach($marques as $marque)
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10">
                                    @if($marque->logo)
                                        <img class="h-10 w-10 rounded-full object-cover" src="{{ asset('storage/' . $marque->logo) }}" alt="{{ $marque->nom_marque }}">
                                    @else
                                        <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <i class="fas fa-building text-blue-400"></i>
                                        </div>
                                    @endif
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">{{ $marque->nom_marque }}</div>
                                    @if(isset($marque->description) && !empty($marque->description))
                                        <div class="text-sm text-gray-500 line-clamp-1">{{ Str::limit($marque->description, 60) }}</div>
                                    @endif
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ $marque->voitures->count() }} {{ Str::plural('Vehicle', $marque->voitures->count()) }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div class="flex justify-end space-x-2">
                                <button onclick="showDeleteModal({{ $marque->id_marque }}, '{{ $marque->nom_marque }}')" 
                                        class="text-red-600 hover:text-red-900 delete-brand" data-id="{{ $marque->id_marque }}" title="Delete Brand">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                              
                                
                                <a href="{{ route('marque.show', $marque->id_marque) }}" 
                                   class="text-blue-600 hover:text-blue-900 ml-3" title="View Brand Details">
                                    <i class="fas fa-eye"></i>
                                </a>
                            </div>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    
    <!-- Empty State - Shows when no brands are available -->
    @if(count($marques) == 0)
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-12 text-center empty-state-container">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6 empty-state-icon">
                <i class="fas fa-tags text-blue-600 text-3xl"></i>
            </div>
            <h3 class="text-2xl font-medium text-gray-900 mb-2">No brands found</h3>
            <p class="text-gray-500 mb-8 max-w-md mx-auto">Get started by adding your first vehicle brand to organize your fleet.</p>
            <a href="{{ route('marque.create') }}" 
               class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                <i class="fas fa-plus mr-2"></i>
                Add New Brand
            </a>
        </div>
    @endif
    
    <!-- Pagination - If needed -->
    <div class="mt-8 flex justify-center">
        {{-- {{ $marques->links() }} --}}
    </div>
</div>

<!-- Delete Confirmation Modal -->
<div id="deleteModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
    <div class="bg-white rounded-lg max-w-md mx-auto mt-20 p-6">
        <div class="flex flex-col items-center">
            <div class="bg-red-100 rounded-full p-3 mb-4">
                <i class="fas fa-exclamation-triangle text-red-500 text-xl"></i>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Delete Brand</h3>
            <p class="text-gray-500 text-center mb-6">Are you sure you want to delete this brand? This action cannot be undone.</p>
            
            <form id="deleteForm" method="POST"  action="{{ route('marque.destroy',$marque->id_marque) }}" class="w-full">
                @csrf
                @method('DELETE')
                <div class="flex justify-center gap-4">
                    <button type="button" id="cancelDelete" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg">
                        Cancel
                    </button>
                    <button type="submit" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                        Yes, Delete
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    // View mode toggle
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const brandsGrid = document.getElementById('brandsGrid');
    const brandsList = document.getElementById('brandsList');
    
    gridViewBtn.addEventListener('click', function() {
        brandsGrid.classList.remove('hidden');
        brandsList.classList.add('hidden');
        gridViewBtn.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-300');
        gridViewBtn.classList.add('bg-blue-600', 'text-white');
        listViewBtn.classList.remove('bg-blue-600', 'text-white');
        listViewBtn.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-300');
    });
    
    listViewBtn.addEventListener('click', function() {
        brandsGrid.classList.add('hidden');
        brandsList.classList.remove('hidden');
        listViewBtn.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-300');
        listViewBtn.classList.add('bg-blue-600', 'text-white');
        gridViewBtn.classList.remove('bg-blue-600', 'text-white');
        gridViewBtn.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-300');
    });
    
    // Sort dropdown
    const sortDropdownButton = document.getElementById('sortDropdownButton');
    const sortDropdownMenu = document.getElementById('sortDropdownMenu');
    
    sortDropdownButton.addEventListener('click', function() {
        sortDropdownMenu.classList.remove('hidden');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!sortDropdownButton.contains(event.target) && !sortDropdownMenu.contains(event.target)) {
            sortDropdownMenu.classList.add('hidden');
        }
    });
    
    // Brand search functionality
    const brandSearch = document.getElementById('brandSearch');
    const brandCards = document.querySelectorAll('.brand-card');
    const tableRows = document.querySelectorAll('#brandsList tbody tr');
    
    brandSearch.addEventListener('input', function() {
        const searchTerm = brandSearch.value.toLowerCase().trim();
        
        // Filter grid view
        brandCards.forEach(card => {
            const brandName = card.querySelector('h3').textContent.toLowerCase();
            if (brandName.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Filter list view
        tableRows.forEach(row => {
            const brandName = row.querySelector('.text-sm.font-medium').textContent.toLowerCase();
            if (brandName.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    const deleteModal = document.getElementById('deleteModal');
    const deleteForm = document.getElementById('deleteForm');
    const deleteButtons = document.querySelectorAll('.delete-brand');
    const cancelDelete = document.getElementById('cancelDelete');

    // Show modal only when delete button is clicked
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const brandId = this.getAttribute('data-id');
            deleteModal.classList.remove('hidden');
        });
    });

    // Hide modal when cancel is clicked
    cancelDelete.addEventListener('click', function() {
        deleteModal.classList.add('hidden');
    });

    // Hide modal when clicking outside
    deleteModal.addEventListener('click', function(e) {
        if (e.target === deleteModal) {
            deleteModal.classList.add('hidden');
        }
    });

    // Hide modal when ESC key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !deleteModal.classList.contains('hidden')) {
            deleteModal.classList.add('hidden');
        }
    });
});
</script>
@endsection