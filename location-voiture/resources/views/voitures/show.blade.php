@extends('layouts.admin')

@section('title', 'Vehicle Details')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        <!-- Header Section with Title and Actions -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h1 class="text-3xl font-bold text-white mb-4 md:mb-0">{{ $voiture->marque->nom_marque  }} {{ $voiture->modele }}</h1>
                <div class="flex space-x-3">
                    <button 
                       id="editVehicleBtn"
                       class="bg-white text-blue-700 px-5 py-2 rounded-lg hover:bg-blue-50 transition duration-200 ease-in-out flex items-center font-medium">
                        <i class="fas fa-edit mr-2"></i> Edit
                    </button>
                    <form 
                          method="POST" 
                          class="inline"
                          onsubmit="return confirm('Are you sure you want to delete this vehicle?');">
                        @csrf
                        @method('DELETE')
                        <button type="submit" 
                                class="bg-white text-red-600 px-5 py-2 rounded-lg hover:bg-red-50 transition duration-200 ease-in-out flex items-center font-medium">
                            <i class="fas fa-trash mr-2"></i> Delete
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Image Gallery with Improved Layout -->
        <div class="p-6 bg-gray-50">
            <h2 class="text-xl font-semibold mb-4 text-gray-800">Vehicle Gallery</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                @if($voiture->imageFront)
                <div class="col-span-2 md:col-span-2 group relative overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-[1.01]">
                    <img src="{{ asset('storage/' . $voiture->imageFront) }}" 
                         alt="Front View" 
                         class="w-full h-72 object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <span class="text-white p-3 font-medium">Front View</span>
                    </div>
                </div>
                @endif
                <div class="grid grid-cols-2 gap-4 col-span-2">
                    @if($voiture->imageRight)
                    <div class="relative overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-[1.01]">
                        <img src="{{ asset('storage/' . $voiture->imageRight) }}" 
                             alt="Right View" 
                             class="w-full h-36 object-cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <span class="text-white p-2 font-medium">Right View</span>
                        </div>
                    </div>
                    @endif
                    @if($voiture->imageLeft)
                    <div class="relative overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-[1.01]">
                        <img src="{{ asset('storage/' . $voiture->imageLeft) }}" 
                             alt="Left View" 
                             class="w-full h-36 object-cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <span class="text-white p-2 font-medium">Left View</span>
                        </div>
                    </div>
                    @endif
                    @if($voiture->imageBack)
                    <div class="col-span-2 relative overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-[1.01]">
                        <img src="{{ asset('storage/' . $voiture->imageBack) }}" 
                             alt="Back View" 
                             class="w-full h-36 object-cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <span class="text-white p-2 font-medium">Back View</span>
                        </div>
                    </div>
                    @endif
                </div>
            </div>
        </div>

        <!-- Vehicle Details with Cards -->
        <div class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Basic Information -->
                <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <h2 class="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                        <i class="fas fa-car-side mr-3 text-blue-600"></i>Vehicle Information
                    </h2>
                    <dl class="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                        <div>
                            <dt class="text-sm font-medium text-gray-500 mb-1">Brand</dt>
                            <dd class="text-lg font-medium text-gray-900">{{ $voiture->marque->nom_marque }}</dd>
                        </div>
                        <div>
                            <dt class="text-sm font-medium text-gray-500 mb-1">Category</dt>
                            <dd class="text-lg font-medium text-gray-900">{{ $voiture->categorie->nom_categorie }}</dd>
                        </div>
                        <div>
                            <dt class="text-sm font-medium text-gray-500 mb-1">Year</dt>
                            <dd class="text-lg font-medium text-gray-900">{{ $voiture->annee }}</dd>
                        </div>
                        <div>
                            <dt class="text-sm font-medium text-gray-500 mb-1">Registration</dt>
                            <dd class="text-lg font-medium text-gray-900">{{ $voiture->immatriculation }}</dd>
                        </div>
                        <div>
                            <dt class="text-sm font-medium text-gray-500 mb-1">Daily Rate</dt>
                            <dd class="text-lg font-medium text-blue-600">${{ number_format($voiture->prix_journalier, 2) }}</dd>
                        </div>
                        <div>
                            <dt class="text-sm font-medium text-gray-500 mb-1">Quantity</dt>
                            <dd class="text-lg font-medium text-gray-900">{{ $voiture->quantity }}</dd>
                        </div>
                        <div class="col-span-1 md:col-span-2">
                            <dt class="text-sm font-medium text-gray-500 mb-1">Status</dt>
                            <dd>
                                @if($voiture->disponible)
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                        <span class="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                                        Available
                                    </span>
                                @else
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                                        <span class="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                                        Not Available
                                    </span>
                                @endif
                            </dd>
                        </div>
                    </dl>
                </div>

                <!-- Description -->
                <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <h2 class="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                        <i class="fas fa-info-circle mr-3 text-blue-600"></i>Description
                    </h2>
                    <div class="prose max-w-none">
                        <p class="text-gray-700 leading-relaxed">{{ $voiture->description }}</p>
                    </div>
                </div>
            </div>
            
            <!-- Update Form - Hidden by default -->
            <div id="updateFormSection" class="mt-8 hidden">
                <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-xl font-semibold text-gray-800 flex items-center">
                            <i class="fas fa-edit mr-3 text-blue-600"></i>Update Vehicle Details
                        </h2>
                        <button id="closeFormBtn" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <form action="{{ route('voiture.update', $voiture->id_voiture) }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        
                        <div class="form-group mb-4">
                            <label class="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" name="name" class="form-control w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" value="{{ $voiture->name }}">
                        </div>

                        <div class="form-group mb-4">
                            <label class="block text-sm font-medium text-gray-700">Price</label>
                            <input type="number" name="price" class="form-control w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" value="{{ $voiture->price }}">
                        </div>

                        <div class="form-group mb-4">
                            <label class="block text-sm font-medium text-gray-700">Category</label>
                            <select name="categorie_id" class="form-control w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                @foreach($categories as $category)
                                    <option value="{{ $category->id }}" {{ $voiture->categorie_id == $category->id ? 'selected' : '' }}>
                                        {{ $category->nom_categorie }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group mb-4">
                            <label class="block text-sm font-medium text-gray-700">Brand</label>
                            <select name="marque_id" class="form-control w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                @foreach($marques as $marque)
                                    <option value="{{ $marque->id }}" {{ $voiture->marque_id == $marque->id ? 'selected' : '' }}>
                                        {{ $marque->nom_marque }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group mt-3 flex justify-end space-x-3">
                            <button type="submit" class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out font-medium">Update</button>
                            <button type="button" id="cancelBtn" class="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 ease-in-out font-medium">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Action Buttons Bottom -->
            <div class="mt-8 flex justify-end space-x-3">
                <a 
                href="{{ url()->previous() }}"
                class="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 ease-in-out font-medium">
                    <i class="fas fa-arrow-left mr-2"></i> Back
                </a>
            </div>
        </div>
    </div>
</div>

<!-- Add this right after your main content div -->
<div id="editModal" class="modal-backdrop"></div>
<div id="editForm" class="modal-content bg-white rounded-xl shadow-2xl">
    <div class="p-6">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">Edit Vehicle</h2>
            <button type="button" class="close-modal text-gray-400 hover:text-gray-600">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <form action="{{ route('voiture.update', $voiture->id_voiture) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Model</label>
                    <input type="text" name="modele" value="{{ $voiture->modele }}" 
                           class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700">Brand</label>
                    <select name="marque_id" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        @foreach($marques as $marque)
                            <option value="{{ $marque->id_marque }}" {{ $voiture->marque_id == $marque->id_marque ? 'selected' : '' }}>
                                {{ $marque->nom_marque }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Category</label>
                    <select name="categorie_id" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                        @foreach($categories as $categorie)
                            <option value="{{ $categorie->id_categorie }}" {{ $voiture->categorie_id == $categorie->id_categorie ? 'selected' : '' }}>
                                {{ $categorie->nom_categorie }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <!-- Add other fields as needed -->

                <div class="col-span-full">
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" rows="3" 
                              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">{{ $voiture->description }}</textarea>
                </div>

                <div class="col-span-full flex justify-end space-x-3 mt-6">
                    <button type="button" class="close-modal px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                        Cancel
                    </button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Update Vehicle
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    const editBtn = document.getElementById('editVehicleBtn');
    const modal = document.getElementById('editModal');
    const form = document.getElementById('editForm');
    const closeButtons = document.querySelectorAll('.close-modal');

    editBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('modal-active');
        form.classList.add('modal-active');
    });

    function closeModal() {
        modal.classList.remove('modal-active');
        form.classList.remove('modal-active');
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('modal-active')) {
            closeModal();
        }
    });
});
</script>
@endsection
@endsection