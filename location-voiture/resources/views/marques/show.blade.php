@extends('layouts.admin')

@section('title', 'Brand Details')

@section('styles')
<style>
    /* Modal styling */
    .modal-backdrop {
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
    
    .modal-content {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.95);
        max-width: 500px;
        width: 90%;
        z-index: 50;
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    .modal-backdrop.modal-active {
        display: block;
        opacity: 1;
    }
    
    .modal-content.modal-active {
        display: block;
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
    
    /* Card animations */
    .brand-card {
        transition: all 0.3s ease;
    }
    
    .brand-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }
    
    /* Badge styling */
    .vehicle-count {
        font-size: 0.875rem;
        font-weight: 600;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        background-color: #3b82f6;
        color: white;
    }
    
    /* Image hover effect */
    .brand-logo {
        transition: transform 0.3s ease;
    }
    
    .brand-logo:hover {
        transform: scale(1.05);
    }
    
    /* Vehicle card image overlay */
    .vehicle-image-container {
        position: relative;
        overflow: hidden;
    }
    
    .vehicle-image {
        transition: transform 0.5s ease;
    }
    
    .vehicle-card:hover .vehicle-image {
        transform: scale(1.1);
    }
    
    .vehicle-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
        padding: 1rem;
        color: white;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .vehicle-card:hover .vehicle-overlay {
        opacity: 1;
    }
    
    /* Action buttons */
    .action-btn {
        transition: all 0.2s ease;
    }
    
    .action-btn:hover {
        transform: translateY(-2px);
    }
    
    /* Custom file input */
    .file-input-wrapper {
        position: relative;
        overflow: hidden;
        display: inline-block;
    }
    
    .file-input-wrapper input[type=file] {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
    
    .file-input-trigger {
        display: inline-block;
        padding: 0.5rem 1rem;
        background-color: #e5e7eb;
        border-radius: 0.375rem;
        color: #374151;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .file-input-trigger:hover {
        background-color: #d1d5db;
    }
    
    .file-name {
        margin-left: 0.5rem;
        font-size: 0.875rem;
    }
    
    /* Breadcrumb navigation */
    .breadcrumb {
        display: flex;
        align-items: center;
        font-size: 0.875rem;
        color: #6b7280;
        margin-bottom: 1rem;
    }
    
    .breadcrumb-item:not(:last-child)::after {
        content: '/';
        margin: 0 0.5rem;
        color: #d1d5db;
    }
    
    .breadcrumb-item a {
        color: #3b82f6;
        transition: color 0.2s ease;
    }
    
    .breadcrumb-item a:hover {
        color: #2563eb;
    }
</style>
@endsection

@section('content')
<div class="container mx-auto px-4 py-8"> 
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div class="flex flex-col md:flex-row justify-between md:items-center">
                <div class="flex items-center space-x-4">
                    @if($marque->logo)
                    <div class="hidden md:block h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src="{{ asset('storage/' . $marque->logo) }}" alt="{{ $marque->nom_marque }} logo" class="h-full w-full object-cover">
                    </div>
                    @endif
                    <div>
                        <h1 class="text-2xl font-bold text-gray-800">{{ $marque->nom_marque }}</h1>
                        <div class="flex items-center mt-1">
                            <span class="vehicle-count">{{ $marque->voitures->count() }} {{ Str::plural('Vehicle', $marque->voitures->count()) }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex space-x-3 mt-4 md:mt-0">
                    <a href="{{ route('marque.index') }}" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center">
                        <i class="fas fa-arrow-left mr-2"></i> Back to Brands
                    </a>
                    <button id="editBtn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition action-btn flex items-center">
                        <i class="fas fa-edit mr-2"></i> Edit
                    </button>
                </div>
            </div>
        </div>

        <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                @if($marque->logo)
                <div class="flex flex-col">
                    <h2 class="text-lg font-semibold mb-3 text-gray-800">Brand Logo</h2>
                    <div class="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64">
                        <img src="{{ asset('storage/' . $marque->logo) }}" 
                             alt="{{ $marque->nom_marque }}" 
                             class="max-h-full max-w-full rounded-lg shadow brand-logo">
                    </div>
                </div>
                @endif

                <div class="flex flex-col">
                    <h2 class="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                        <i class="fas fa-info-circle mr-2 text-blue-500"></i>
                        Brand Information
                    </h2>
                    <div class="bg-gray-50 rounded-lg p-6 flex-grow border border-gray-100">
                        <dl class="grid grid-cols-1 gap-5">
                            <div>
                                <dt class="text-sm font-medium text-gray-500">Brand Name</dt>
                                <dd class="mt-1 text-lg font-medium text-gray-900">{{ $marque->nom_marque }}</dd>
                            </div>
                            
                            <div>
                                <dt class="text-sm font-medium text-gray-500">Total Vehicles</dt>
                                @if ($marque->voitures->count() > 0)
                                <dd class="mt-1 text-lg font-medium text-gray-900">
                                    {{ $marque->voitures->count() }} {{ Str::plural('vehicle', $marque->voitures->count()) }}
                                </dd>
                                @else
                                <dd class="mt-1 text-gray-900 italic">No vehicles available</dd>
                                @endif
                            </div>
                            
                            <div>
                                <dt class="text-sm font-medium text-gray-500">Created</dt>
                                <dd class="mt-1 text-gray-900">
                                    {{ $marque->created_at ? $marque->created_at->format('M d, Y') : 'N/A' }}
                                </dd>
                            </div>
                            
                            <div>
                                <dt class="text-sm font-medium text-gray-500">Last Updated</dt>
                                <dd class="mt-1 text-gray-900">
                                    {{ $marque->updated_at ? $marque->updated_at->format('M d, Y') : 'N/A' }}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            @if($marque->voitures->count() > 0)
            <div class="mt-10">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-semibold text-gray-800 flex items-center">
                        <i class="fas fa-car mr-2 text-blue-500"></i>
                        Vehicles in this Brand
                    </h2>
                    
                    <div class="flex items-center">
                        <span class="text-sm text-gray-500 mr-2">Sort By:</span>
                        <select class="form-select rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500">
                            <option>Newest First</option>
                            <option>Oldest First</option>
                            <option>Model (A-Z)</option>
                            <option>Model (Z-A)</option>
                        </select>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    @foreach($marque->voitures as $voiture)
                    <div class="bg-white rounded-xl shadow border border-gray-100 overflow-hidden vehicle-card brand-card">
                        <div class="vehicle-image-container h-48">
                            @if($voiture->imageFront)
                            <img src="{{ asset('storage/' . $voiture->imageFront) }}" 
                                 alt="{{ $voiture->modele }}"
                                 class="w-full h-full object-cover vehicle-image">
                            <div class="vehicle-overlay">
                                <span class="text-xs uppercase tracking-wide">Year: {{ $voiture->annee }}</span>
                            </div>
                            @else
                            <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                                <i class="fas fa-car text-gray-400 text-4xl"></i>
                            </div>
                            @endif
                        </div>
                        
                        <div class="p-4">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h3 class="font-semibold text-gray-800">{{ $voiture->modele }}</h3>
                                    <p class="text-gray-600 text-sm">{{ $voiture->annee }}</p>
                                </div>
                                
                                @if(isset($voiture->prix_journalier))
                                <div class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                                    ${{ number_format($voiture->prix_journalier, 2) }}/day
                                </div>
                                @endif
                            </div>
                            
                            <div class="mt-4 flex justify-between items-center">
                                <a href="{{ route('voiture.show', $voiture->id_voiture) }}" 
                                   class="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                                    <i class="fas fa-eye mr-1"></i> View Details
                                </a>
                                
                                <span class="text-xs text-gray-500">
                                    @if(isset($voiture->disponible) && $voiture->disponible === true )
                                    <span class="text-green-600"><i class="fas fa-circle text-xs mr-1"></i> Available</span>
                                    @else
                                    <span class="text-red-600"><i class="fas fa-circle text-xs mr-1"></i> Unavailable</span>
                                    @endif
                                </span>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
            @else
            <div class="mt-8 bg-gray-50 rounded-lg p-8 text-center">
                <i class="fas fa-car text-gray-300 text-5xl mb-4"></i>
                <h3 class="text-lg font-medium text-gray-800 mb-2">No Vehicles Available</h3>
                <p class="text-gray-600 mb-4">This brand doesn't have any vehicles yet.</p>
                <a href="{{ route('voiture.create') }}" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    <i class="fas fa-plus mr-2"></i> Add Vehicle
                </a>
            </div>
            @endif
        </div>
    </div>
</div>

<div id="editModal" class="modal-backdrop"></div>
<div id="editForm" class="modal-content bg-white rounded-xl shadow-2xl">
    <div class="p-6">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-800">Edit Brand</h2>
            <button type="button" class="close-modal text-gray-400 hover:text-gray-600 focus:outline-none">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <form action="{{ route('marque.update', $marque->id_marque) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            
            <div class="space-y-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                    <input type="text" name="nom_marque" value="{{ $marque->nom_marque }}" 
                           class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Logo</label>
                    
                    @if($marque->logo)
                    <div class="mb-3 flex items-center">
                        <img src="{{ asset('storage/' . $marque->logo) }}" alt="Current logo" class="h-12 w-12 object-cover rounded mr-3">
                        <span class="text-sm text-gray-600">Current logo</span>
                    </div>
                    @endif
                    
                    <div class="file-input-wrapper">
                        <div class="file-input-trigger flex items-center">
                            <i class="fas fa-upload mr-2"></i> Choose new logo
                        </div>
                        <input type="file" name="logo" accept="image/*" id="logoInput" class="hidden">
                    </div>
                    <div id="selectedFileName" class="file-name text-gray-600 mt-1"></div>
                    <p class="text-xs text-gray-500 mt-1">Recommended: Square image, minimum 200x200px</p>
                </div>

                <div class="flex justify-end space-x-3 mt-8">
                    <button type="button" class="close-modal px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                        Cancel
                    </button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        <i class="fas fa-save mr-2"></i> Update Brand
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>

@endsection

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const editBtn = document.querySelector('#editBtn');
    const modal = document.getElementById('editModal');
    const form = document.getElementById('editForm');
    const closeButtons = document.querySelectorAll('.close-modal');

    editBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('modal-active');
        form.classList.add('modal-active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    function closeModal() {
        modal.classList.remove('modal-active');
        form.classList.remove('modal-active');
        document.body.style.overflow = ''; // Enable scrolling
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Escape key closes modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('modal-active')) {
            closeModal();
        }
    });
    
    // File input enhancement
    const fileInput = document.getElementById('logoInput');
    const fileNameDisplay = document.getElementById('selectedFileName');
    const fileTrigger = document.querySelector('.file-input-trigger');
    
    fileTrigger.addEventListener('click', function() {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            fileNameDisplay.textContent = fileInput.files[0].name;
        } else {
            fileNameDisplay.textContent = '';
        }
    });
});
</script>
@endsection