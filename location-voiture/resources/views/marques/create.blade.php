@extends('layouts.admin')

@section('title', 'Add New Marque')

@section('breadcrumb', 'Add Marque')

@section('content')
<div class="max-w-3xl mx-auto">
    <!-- Top Card -->
    <div class="bg-white shadow-sm rounded-lg mb-6 border-l-4 border-primary-500 overflow-hidden">
        <div class="p-6">
            <div class="flex items-center">
                <div class="flex-shrink-0 bg-primary-100 p-3 rounded-full">
                    <i class="fas fa-tag text-primary-600 text-xl"></i>
                </div>
                <div class="ml-5">
                    <h2 class="text-xl font-semibold text-gray-800">Add New Marque</h2>
                    <p class="text-gray-600 mt-1">Create a new car brand in your inventory system</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Flash Messages -->
    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    @if(session('error'))
        <div class="alert alert-error">
            {{ session('error') }}
        </div>
    @endif

    <!-- Form Card -->
    <div class="bg-white shadow-sm rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div class="flex items-center">
                <span class="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <i class="fas fa-plus text-primary-600"></i>
                </span>
                <h3 class="text-base font-medium text-gray-700">Marque Details</h3>
            </div>
        </div>
        
        <form action="{{ route('marque.store') }}" method="POST" enctype="multipart/form-data" class="p-6" id="marqueForm">
            @csrf
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Marque Name Input -->
                <div class="space-y-2">
                    <label for="nom_marque" class="block text-sm font-medium text-gray-700">
                        Marque Name <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i class="fas fa-car-side text-gray-400"></i>
                        </div>
                        <input 
                            type="text" 
                            id="nom_marque" 
                            name="nom_marque" 
                            value="{{ old('nom_marque') }}" 
                            class="pl-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            required
                            placeholder="Enter brand name"
                        >
                    </div>
                    @error('nom_marque')
                        <p class="mt-1 text-sm text-red-600 flex items-center">
                            <i class="fas fa-exclamation-circle mr-1"></i>
                            {{ $message }}
                        </p>
                    @enderror
                    <p class="text-xs text-gray-500 mt-1">Enter the official name of the car brand</p>
                </div>

                <!-- Logo Preview Area -->
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-gray-700">Logo Preview</label>
                    <div class="mt-1 border border-gray-300 rounded-md p-2 h-[140px] bg-gray-50 flex items-center justify-center">
                        <img id="logo-preview" src="/api/placeholder/200/120" alt="Logo preview" class="max-h-[120px] max-w-full hidden">
                        <div id="preview-placeholder" class="text-center">
                            <i class="fas fa-image text-gray-400 text-3xl mb-2"></i>
                            <p class="text-sm text-gray-500">Preview will appear here</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Logo Upload -->
            <div class="mt-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Upload Logo <span class="text-red-500">*</span></label>
                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-gray-50 transition-all duration-200" id="drop-area">
                    <div class="space-y-1 text-center">
                        <i class="fas fa-cloud-upload-alt text-4xl text-gray-400"></i>
                        <div class="flex text-sm text-gray-600 mt-3">
                            <label for="logo" class="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500 px-3 py-2">
                                <span>Upload a file</span>
                                <input id="logo" name="logo" type="file" class="sr-only" accept="image/*" required>
                            </label>
                            <p class="pl-1 pt-2">or drag and drop</p>
                        </div>
                        <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
                @error('logo')
                    <p class="mt-1 text-sm text-red-600 flex items-center">
                        <i class="fas fa-exclamation-circle mr-1"></i>
                        {{ $message }}
                    </p>
                @enderror
            </div>

            <!-- Additional Info (Optional) -->
            <div class="mt-6">
                <label for="description" class="block text-sm font-medium text-gray-700">
                    Description <span class="text-gray-400">(Optional)</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows="3"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Add any additional information about this brand"
                >{{ old('description') }}</textarea>
                <p class="text-xs text-gray-500 mt-1">Brief description about the car brand</p>
            </div>

            <!-- Action Buttons -->
            <div class="mt-8 flex justify-end space-x-3">
                <a 
                    class="inline-flex justify-center items-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                >
                    <i class="fas fa-times mr-2"></i>
                    Cancel
                </a>
                <button 
                    type="submit" 
                    class="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                >
                    <i class="fas fa-save mr-2"></i>
                    Save Marque
                </button>
            </div>
        </form>
    </div>

    <!-- Helpful Tips Card -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg mt-6 p-4">
        <div class="flex">
            <div class="flex-shrink-0">
                <i class="fas fa-info-circle text-blue-500"></i>
            </div>
            <div class="ml-3">
                <h3 class="text-sm font-medium text-blue-800">Tips for adding marques</h3>
                <div class="mt-2 text-sm text-blue-700">
                    <ul class="list-disc pl-5 space-y-1">
                        <li>Use official brand names to maintain consistency</li>
                        <li>Upload high-resolution logos (preferably with transparent backgrounds)</li>
                        <li>Ensure you have rights to use the logo images</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const fileInput = document.getElementById('logo');
        const logoPreview = document.getElementById('logo-preview');
        const previewPlaceholder = document.getElementById('preview-placeholder');
        const dropArea = document.getElementById('drop-area');
        
        // Preview uploaded image
        fileInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    logoPreview.src = e.target.result;
                    logoPreview.classList.remove('hidden');
                    previewPlaceholder.classList.add('hidden');
                }
                reader.readAsDataURL(file);
                dropArea.classList.add('bg-primary-50', 'border-primary-300');
                dropArea.classList.remove('bg-gray-50', 'border-gray-300');
            }
        });
        
        // Drag and drop functionality
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false);
        });
        
        function highlight() {
            dropArea.classList.add('bg-primary-50', 'border-primary-300');
            dropArea.classList.remove('bg-gray-50', 'border-gray-300');
        }
        
        function unhighlight() {
            dropArea.classList.remove('bg-primary-50', 'border-primary-300');
            dropArea.classList.add('bg-gray-50', 'border-gray-300');
        }
        
        dropArea.addEventListener('drop', handleDrop, false);
        
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const file = dt.files[0];
            
            if (file && file.type.startsWith('image/')) {
                fileInput.files = dt.files;
                const event = new Event('change');
                fileInput.dispatchEvent(event);
            }
        }
        
        // Form validation
        const form = document.getElementById('marqueForm');
        form.addEventListener('submit', function(e) {
            const nameInput = document.getElementById('nom_marque');
            if (!nameInput.value.trim()) {
                e.preventDefault();
                nameInput.classList.add('border-red-500');
                // You could add more validation feedback here
            }
            
            if (!fileInput.files[0]) {
                e.preventDefault();
                dropArea.classList.add('border-red-500');
                // You could add more validation feedback here
            }
        });
    });
</script>
@endsection