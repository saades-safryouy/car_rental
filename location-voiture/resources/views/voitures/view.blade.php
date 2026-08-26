@extends('layouts.admin')

@section('title', 'Cars Management')
@section('breadcrumb', 'Cars List')

@section('content')
    <div class="bg-white rounded-xl shadow-md p-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Cars Inventory</h1>
            <a href="{{ route('voiture.create') }}" class="bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg inline-flex items-center transition-all duration-300 transform hover:scale-105 shadow-md">
                <i class="fas fa-plus mr-2"></i> Add New Car
            </a>
        </div>
        
        <!-- Filters Section -->
        <div class="bg-gray-50 rounded-xl p-6 mb-8 shadow-sm">
            <div class="flex flex-col md:flex-row md:items-end md:space-x-6">
                <div class="flex-1 mb-4 md:mb-0">
                    <label for="marque_filter" class="block text-sm font-medium text-gray-600 mb-2">Brand</label>
                    <select id="marque_filter" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-30 transition-all duration-200">
                        <option value="">All Brands</option>
                        @foreach ($marques as $marque)
                        <option value="{{ $marque->id }}">{{ $marque->nom_marque }}</option>
                        @endforeach
                    </select>
                </div>
                
                <div class="flex-1 mb-4 md:mb-0">
                    <label for="categorie_filter" class="block text-sm font-medium text-gray-600 mb-2">Category</label>
                    <select id="categorie_filter" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-30 transition-all duration-200">
                        <option value="">All Categories</option>
                        @foreach ($categories as $categorie)
                        <option value="{{ $categorie->id }}">{{ $categorie->nom_categorie }}</option>
                        @endforeach
                    </select>
                </div>
                
                <div class="flex-1">
                    <label for="search" class="block text-sm font-medium text-gray-600 mb-2">Search</label>
                    <div class="relative">
                        <input type="search" id="search" placeholder="Search cars..." class="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-30 pl-10 transition-all duration-200">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i class="fas fa-search text-gray-400"></i>
                        </div>
                    </div>
                </div>
                
                <div class="mt-4 md:mt-0">
                    <button id="apply-filters" class="bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-lg inline-flex items-center transition-all duration-300 shadow-sm">
                        <i class="fas fa-filter mr-2"></i> Apply Filters
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Cars Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @forelse ($voitures as $voiture)
                <div class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 dashboard-card opacity-0 translate-y-4 hover:border-primary-300">
                    <div class="relative pb-[60%] bg-gray-100">
                        @if($voiture->imageFront)
                            <img src="{{ asset('storage/' . $voiture->imageFront) }}" alt="{{ $voiture->marque->nom_marque }} {{ $voiture->modele }}" class="absolute h-full w-full object-cover transition-all duration-500 hover:scale-105">
                        @else
                            <div class="absolute inset-0 flex items-center justify-center bg-gray-100">
                                <i class="fas fa-car text-gray-300 text-5xl"></i>
                            </div>
                        @endif
                        <div class="absolute top-0 right-0 mt-3 mr-3">
                            <span class="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">{{ $voiture->categorie->nom_categorie ?? 'N/A' }}</span>
                        </div>
                        
                        <div class="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full py-3 px-4">
                            <h2 class="text-lg font-bold text-white">{{ $voiture->marque->nom_marque }} {{ $voiture->modele }}</h2>
                            <span class="text-sm font-medium text-gray-200">{{ $voiture->annee }}</span>
                        </div>
                    </div>
                    
                    <div class="p-5">
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex space-x-4">
                                <span class="flex items-center text-gray-600 text-sm">
                                    <i class="fas fa-gas-pump mr-1"></i> {{ $voiture->carburant ?? 'N/A' }}
                                </span>
                                <span class="flex items-center text-gray-600 text-sm">
                                    <i class="fas fa-cog mr-1"></i> {{ $voiture->boite_vitesse ?? 'N/A' }}
                                </span>
                            </div>
                            
                            <div class="flex items-center">
                                <span class="text-sm text-gray-500 mr-2">Status:</span>
                                @if($voiture->disponible ?? true)
                                    <span class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center">
                                        <span class="w-2 h-2 bg-green-500 rounded-full mr-1"></span>Available
                                    </span>
                                @else
                                    <span class="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full flex items-center">
                                        <span class="w-2 h-2 bg-red-500 rounded-full mr-1"></span>Rented
                                    </span>
                                @endif
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between mb-5">
                            <div class="text-primary-600 font-bold text-xl">${{ number_format($voiture->prix_journalier, 2) }}
                                <span class="text-gray-500 font-normal text-xs"> / day</span>
                            </div>
                        </div>
                        
                        <div class="flex space-x-3">
                            <a href="{{ route('voiture.show', $voiture->id_voiture) }}" class="flex-1 bg-primary-50 hover:bg-primary-100 text-primary-600 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center transition-colors duration-300 border border-primary-200">
                                <i class="fas fa-eye mr-2"></i> View Details
                            </a>
                            <button type="button" data-id="{{ $voiture->id_voiture }}" class="delete-car bg-white border border-red-300 hover:bg-red-50 text-red-600 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center transition-colors duration-300">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            @empty
                <div class="col-span-full flex flex-col items-center justify-center py-16 text-center">
                    <div class="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                        <i class="fas fa-car-side text-gray-400 text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-medium text-gray-800 mb-3">No cars found</h3>
                    <p class="text-gray-500 mb-6 max-w-md">No vehicles match your current filter criteria. Try adjusting your filters to see more results.</p>
                    <button id="clear-filters" class="text-primary-600 hover:text-primary-700 font-medium flex items-center bg-primary-50 hover:bg-primary-100 px-5 py-2.5 rounded-lg transition-all duration-300">
                        <i class="fas fa-filter mr-2"></i> Clear all filters
                    </button>
                </div>
            @endforelse
        </div>
        
        <!-- Pagination (if needed) -->
        <div class="mt-8">
            @if(isset($voitures) && method_exists($voitures, 'links'))
                {{ $voitures->links() }}
            @endif
        </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div id="deleteModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center hidden backdrop-blur-sm transition-all duration-300">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6 mx-4 transform transition-all">
            <div class="text-center mb-6">
                <div class="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Delete Car</h3>
                <p class="text-gray-600">Are you sure you want to delete this car? This action cannot be undone.</p>
            </div>
            <form id="deleteForm" method="POST">
                @csrf
                @method('DELETE')
                <div class="flex justify-center space-x-4">
                    <button type="button" id="cancelDelete" class="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 font-medium transition-colors duration-300 w-1/2">
                        Cancel
                    </button>
                    <button type="submit" class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-medium transition-colors duration-300 w-1/2">
                        Yes, Delete
                    </button>
                </div>
            </form>
        </div>
    </div>
@endsection

@section('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Filter functionality
        const marqueFilter = document.getElementById('marque_filter');
        const categorieFilter = document.getElementById('categorie_filter');
        const searchInput = document.getElementById('search');
        const clearFiltersBtn = document.getElementById('clear-filters');
        const applyFiltersBtn = document.getElementById('apply-filters');
        
        function applyFilters() {
            const marqueId = marqueFilter.value;
            const categorieId = categorieFilter.value;
            const searchTerm = searchInput.value;
            
            let url = new URL(window.location.href);
            url.searchParams.delete('marque');
            url.searchParams.delete('categorie');
            url.searchParams.delete('search');
            
            if (marqueId) url.searchParams.set('marque', marqueId);
            if (categorieId) url.searchParams.set('categorie', categorieId);
            if (searchTerm) url.searchParams.set('search', searchTerm);
            
            window.location.href = url.toString();
        }
        
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', applyFilters);
        }
        
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    applyFilters();
                }
            });
        }
        
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', function() {
                window.location.href = window.location.pathname;
            });
        }
        
        // Set filter values from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        if (marqueFilter && urlParams.has('marque')) {
            marqueFilter.value = urlParams.get('marque');
        }
        if (categorieFilter && urlParams.has('categorie')) {
            categorieFilter.value = urlParams.get('categorie');
        }
        if (searchInput && urlParams.has('search')) {
            searchInput.value = urlParams.get('search');
        }
        
        // Delete car functionality
        const deleteButtons = document.querySelectorAll('.delete-car');
        const deleteModal = document.getElementById('deleteModal');
        const deleteForm = document.getElementById('deleteForm');
        const cancelDelete = document.getElementById('cancelDelete');
        
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const carId = this.getAttribute('data-id');
                deleteForm.action = `/admin/voiture/${carId}`;
                deleteModal.classList.remove('hidden');
                deleteModal.classList.add('fade-in');
                document.body.style.overflow = 'hidden';
            });
        });
        
        if (cancelDelete) {
            cancelDelete.addEventListener('click', function() {
                deleteModal.classList.add('hidden');
                document.body.style.overflow = '';
            });
        }
        
        // Close modal when clicking outside
        deleteModal?.addEventListener('click', function(e) {
            if (e.target === deleteModal) {
                deleteModal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });

        // Animate cards on page load with staggered delay
        const cards = document.querySelectorAll('.dashboard-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('transition-opacity', 'transition-transform', 'duration-500');
                card.classList.remove('opacity-0', 'translate-y-4');
            }, 100 * index);
        });
    });
</script>

<style>
    /* Add custom animations */
    .fade-in {
        animation: fadeIn 0.3s ease forwards;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    /* Smoother transitions */
    .transition-all {
        transition-property: all;
    }
    
    /* Enhanced focus styles */
    select:focus, input:focus {
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
    }
</style>
@endsection