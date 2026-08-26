@extends('layouts.admin')

@section('content')
<div class="container">
    <h1 class="page-header">Add New Vehicle</h1>

    @if(session('success'))
        <div class="success-message">
            <svg class="success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{{ session('success') }}</span>
        </div>
    @endif

    <form action="{{ route('voiture.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-group">
                <label for="id_marque" class="form-label">Brand</label>
                <select name="id_marque" id="id_marque" class="form-control" required>
                    <option value="">Select a brand</option>
                    @foreach($marques as $marque)
                        <option value="{{ $marque->id_marque }}">{{ $marque->nom_marque }}</option>
                    @endforeach
                </select>
                @error('id_marque')
                    <span class="text-red-500">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label for="id_categorie" class="form-label">Category</label>
                <select name="id_categorie" id="id_categorie" class="form-control" required>
                    <option value="">Select a category</option>
                    @foreach($categories as $category)
                        <option value="{{ $category->id_categorie }}">{{ $category->nom_categorie }}</option>
                    @endforeach
                </select>
                @error('id_categorie')
                    <span class="text-red-500">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label for="modele" class="form-label">Model</label>
                <input type="text" id="modele" name="modele" class="form-control" required>
                @error('modele')
                    <span class="text-red-500">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label for="annee" class="form-label">Year</label>
                <input type="number" id="annee" name="annee" class="form-control" min="1900" max="{{ date('Y') + 1 }}" required>
                @error('annee')
                    <span class="text-red-500">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label for="immatriculation" class="form-label">Registration Number</label>
                <input type="text" id="immatriculation" name="immatriculation" class="form-control" required>
                @error('immatriculation')
                    <span class="text-red-500">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label for="prix_journalier" class="form-label">Daily price</label>
                <input type="number" id="prix_journalier" name="prix_journalier" class="form-control" min="0" step="0.01" required>
                @error('prix_journalier')
                    <span class="text-red-500">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group">
                <label for="quantity" class="form-label">Quantity</label>
                <input type="number" 
                       id="quantity" 
                       name="quantity" 
                       class="form-control" 
                       min="1" 
                       value="1" 
                       required>
                @error('quantity')
                    <span class="text-red-500">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group col-span-2">
                <label for="description" class="form-label">Description</label>
                <textarea id="description" name="description" class="form-control" rows="4" required></textarea>
                @error('description')
                    <span class="text-red-500">{{ $message }}</span>
                @enderror
            </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            @php
                $imageFields = [
                    'imageFront' => 'Front View',
                    'imageRight' => 'Right Side',
                    'imageLeft' => 'Left Side',
                    'imageBack' => 'Back View'
                ];
            @endphp

            @foreach($imageFields as $field => $label)
            <div class="form-group">
                <label for="{{ $field }}" class="form-label">{{ $label }}</label>
                <div class="file-input-container">
                    <label for="{{ $field }}" class="file-input-label">
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>
                            <polyline points="7 9 12 4 17 9"/>
                            <line x1="12" y1="4" x2="12" y2="16"/>
                        </svg>
                        <span>Upload {{ $label }}</span>
                    </label>
                    <input type="file" 
                           id="{{ $field }}" 
                           name="{{ $field }}" 
                           class="file-input" 
                           accept="image/*"
                           required
                           onchange="previewImage(this, '{{ $field }}')">
                    <div id="preview_{{ $field }}" class="image-preview mt-2"></div>
                </div>
                @error($field)
                    <div class="error-text">{{ $message }}</div>
                @enderror
            </div>
            @endforeach
        </div>

        <div class="col-span-2">
            <button type="submit" class="btn btn-submit">
                Add Vehicle
            </button>
        </div>
    </form>
</div>

<style>
    /* Base styling improvements */
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }
    
    .page-header {
        font-size: 2rem;
        font-weight: 700;
        color: #2c3e50;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #eaeaea;
    }
    
    /* Success message styling */
    .success-message {
        display: flex;
        align-items: center;
        background-color: #d4edda;
        color: #155724;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        border-left: 4px solid #28a745;
    }
    
    .success-icon {
        width: 24px;
        height: 24px;
        stroke: #28a745;
        margin-right: 0.75rem;
    }
    
    /* Form styling */
    .form-group {
        margin-bottom: 1.5rem;
    }
    
    .form-label {
        display: block;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #4a5568;
    }
    
    .form-control {
        width: 100%;
        padding: 0.75rem 1rem;
        font-size: 1rem;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 6px;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
    
    .form-control:focus {
        border-color: #80bdff;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
    
    select.form-control {
        cursor: pointer;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23495057' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 1rem center;
        background-size: 16px;
        padding-right: 2.5rem;
    }
    
    textarea.form-control {
        resize: vertical;
        min-height: 120px;
    }
    
    /* File input styling */
    .file-input-container {
        position: relative;
    }
    
    .file-input {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }
    
    .file-input-label {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 1rem;
        background-color: #f8f9fa;
        color: #495057;
        border: 1px dashed #ced4da;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-weight: 500;
    }
    
    .file-input-label:hover {
        background-color: #e9ecef;
        border-color: #adb5bd;
    }
    
    .file-input-label svg {
        margin-right: 0.5rem;
    }
    
    .image-preview {
        margin-top: 0.75rem;
        border-radius: 6px;
        overflow: hidden;
        background-color: #f8f9fa;
        border: 1px solid #eaeaea;
        height: 150px;
    }
    
    .image-preview img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 6px;
        transition: transform 0.2s ease;
    }
    
    .image-preview img:hover {
        transform: scale(1.03);
    }
    
    /* Button styling */
    .btn {
        display: inline-block;
        font-weight: 600;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;
        border: 1px solid transparent;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: 6px;
        transition: all 0.15s ease-in-out;
        cursor: pointer;
    }
    
    .btn-submit {
        color: #fff;
        background-color: #3490dc;
        border-color: #3490dc;
        box-shadow: 0 2px 4px rgba(52, 144, 220, 0.2);
    }
    
    .btn-submit:hover {
        background-color: #2779bd;
        border-color: #2779bd;
        box-shadow: 0 4px 8px rgba(52, 144, 220, 0.3);
    }
    
    /* Error message styling */
    .text-red-500, .error-text {
        color: #e3342f;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    /* Grid layout improvements */
    .grid {
        display: grid;
    }
    
    .grid-cols-1 {
        grid-template-columns: 1fr;
    }
    
    .grid-cols-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    
    .gap-4 {
        gap: 1rem;
    }
    
    .gap-6 {
        gap: 1.5rem;
    }
    
    .col-span-2 {
        grid-column: span 2 / span 2;
    }
    
    .mt-2 {
        margin-top: 0.5rem;
    }
    
    .mt-6 {
        margin-top: 1.5rem;
    }
    
    .space-y-6 > * + * {
        margin-top: 1.5rem;
    }
    
    /* Responsive adjustments */
    @media (min-width: 768px) {
        .md\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        
        .md\:grid-cols-4 {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
    }
    
    /* Animation effects */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .success-message {
        animation: fadeIn 0.4s ease-in-out;
    }
    
    /* Improved focus states for accessibility */
    input:focus, select:focus, textarea:focus, .file-input-label:focus-within {
        outline: none;
        border-color: #3490dc;
        box-shadow: 0 0 0 3px rgba(52, 144, 220, 0.25);
    }
</style>

<script>
    function previewImage(input, fieldName) {
        const preview = document.getElementById('preview_' + fieldName);
        preview.innerHTML = '';
        
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.classList.add('preview-img');
                preview.appendChild(img);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
</script>
@endsection