@extends('layouts.admin')

@section('title', 'Category Details')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <!-- Header Section with Background Gradient -->
        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="flex items-center space-x-4 w-full md:w-auto mb-4 md:mb-0">
                    @if($categorie->image)
                        <img src="{{ asset('storage/' . $categorie->image) }}" 
                             alt="{{ $categorie->nom_categorie }}" 
                             class="h-16 w-16 object-cover rounded-full border-4 border-white shadow-md">
                    @else
                        <div class="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center border-4 border-white shadow-md">
                            <i class="fas fa-folder text-indigo-500 text-2xl"></i>
                        </div>
                    @endif
                    <h1 class="text-2xl font-bold text-white">{{ $categorie->nom_categorie }}</h1>
                </div>
                <div class="flex space-x-3">
                    <a id="editBtn" href="#" 
                       class="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition duration-200 shadow-md flex items-center">
                        <i class="fas fa-edit mr-2"></i> Edit Category
                    </a>
                    <a href="{{ route('categorie.index') }}" 
                       class="px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition duration-200 shadow-md flex items-center">
                        <i class="fas fa-arrow-left mr-2"></i> Back
                    </a>
                </div>
            </div>
        </div>

        <div class="p-6">
            <!-- Category Information Card -->
            <div class="mb-8">
                <h2 class="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                    <i class="fas fa-info-circle mr-2 text-indigo-500"></i> Category Information
                </h2>
                <div class="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
                    <dl class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <dt class="text-sm font-medium text-indigo-600">Description</dt>
                            <dd class="mt-1 text-gray-800">{{ $categorie->description ?: 'No description available' }}</dd>
                        </div>
                        <div>
                            <dt class="text-sm font-medium text-indigo-600">Total Vehicles</dt>
                            <dd class="mt-1 text-gray-800 flex items-center">
                                <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {{ $categorie->voitures->count() }}
                                </span>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <!-- Vehicles List Section -->
            @if($categorie->voitures->count() > 0)
            <div>
                <h2 class="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                    <i class="fas fa-car mr-2 text-indigo-500"></i> Vehicles in this Category
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    @foreach($categorie->voitures as $voiture)
                    <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden group">
                        @if($voiture->imageFront)
                        <div class="relative overflow-hidden">
                            <img src="{{ asset('storage/' . $voiture->imageFront) }}" 
                                 alt="{{ $voiture->modele }}"
                                 class="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300">
                            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                <p class="text-white font-bold">{{ $voiture->marque->nom_marque }} {{ $voiture->modele }}</p>
                            </div>
                        </div>
                        @endif
                        <div class="p-4">
                            <div class="flex justify-between items-center mb-2">
                                <h3 class="font-semibold text-gray-800">{{ $voiture->modele }}</h3>
                                <span class="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full">{{ $voiture->annee }}</span>
                            </div>
                            <p class="text-sm text-gray-600 mb-4">{{ $voiture->marque->nom_marque }}</p>
                            <a href="{{ route('voiture.show', $voiture->id_voiture) }}" 
                               class="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center justify-center w-full py-2 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors duration-200">
                                <i class="fas fa-eye mr-2"></i> View Details
                            </a>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
            @else
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <i class="fas fa-exclamation-circle text-yellow-400"></i>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-yellow-700">
                            No vehicles have been assigned to this category yet.
                        </p>
                    </div>
                </div>
            </div>
            @endif
        </div>
    </div>
</div>

<!-- Edit Modal with Improved Styling -->
<div id="editModal" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden flex items-center justify-center">
    <div id="editForm" class="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold text-white">Edit Category</h2>
                <button type="button" class="close-modal text-white hover:text-gray-200 focus:outline-none">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
        
        <form action="{{ route('categorie.update', $categorie->id_categorie) }}" method="POST" enctype="multipart/form-data" class="p-6">
            @csrf
            @method('PUT')
            
            <div class="space-y-4">
                <!-- Image upload field -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
                    <div class="flex items-center space-x-4">
                        @if($categorie->image)
                        <img src="{{ asset('storage/' . $categorie->image) }}" 
                             alt="Current image" 
                             class="h-16 w-16 object-cover rounded-lg border border-gray-200">
                        @endif
                        <div class="flex-1">
                            <label for="image" class="cursor-pointer flex items-center justify-center space-x-2 w-full py-2 border-2 border-dashed border-indigo-300 rounded-lg hover:bg-indigo-50 transition-colors duration-200">
                                <i class="fas fa-cloud-upload-alt text-indigo-500"></i>
                                <span class="text-sm text-indigo-600">Choose a new image</span>
                                <input type="file" name="image" id="image" accept="image/*" class="hidden">
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <label for="nom_categorie" class="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                    <input type="text" name="nom_categorie" id="nom_categorie" value="{{ $categorie->nom_categorie }}" 
                           class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>
                
                <div>
                    <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea name="description" id="description" rows="4" 
                              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">{{ $categorie->description }}</textarea>
                </div>
                
                <div class="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-100">
                    <button type="button" class="close-modal px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200">
                        Cancel
                    </button>
                    <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200">
                        Update Category
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    const editBtn = document.querySelector('#editBtn');
    const modal = document.getElementById('editModal');
    const closeButtons = document.querySelectorAll('.close-modal');

    editBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    });

    function closeModal() {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // File input preview
    const fileInput = document.getElementById('image');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.createElement('img');
                    preview.src = e.target.result;
                    preview.className = 'h-16 w-16 object-cover rounded-lg border border-gray-200';
                    
                    const container = fileInput.closest('div').parentElement;
                    const existingPreview = container.querySelector('img');
                    
                    if (existingPreview) {
                        container.replaceChild(preview, existingPreview);
                    } else {
                        container.prepend(preview);
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
</script>

<style>
    /* Additional styles for modal animation */
    #editModal {
        transition: opacity 0.3s ease-out;
    }
    #editModal.hidden {
        opacity: 0;
        pointer-events: none;
    }
    #editForm {
        transition: transform 0.3s ease-out, opacity 0.3s ease-out;
        transform: translateY(0);
        opacity: 1;
    }
    #editModal.hidden #editForm {
        transform: translateY(20px);
        opacity: 0;
    }
</style>
@endsection
@endsection