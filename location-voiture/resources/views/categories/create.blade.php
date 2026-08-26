@extends('layouts.admin')
@section('content')   
    <style>
        :root {
            --primary-color: #2563eb;      /* Updated to a modern blue */
            --secondary-color: #1e40af;    /* Darker blue for hover states */
            --success-color: #10b981;      /* More teal-green for success messages */
            --error-color: #ef4444;        /* Vibrant red for errors */
            --text-color: #1f2937;         /* Darker text for better readability */
            --light-bg: #f3f4f6;           /* Subtle gray background */
            --border-radius: 6px;          /* Slightly reduced border radius */
            --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Softer shadow */
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .container {
            max-width: 800px;  /* Increased width for dashboard feel */
            margin: 40px auto;
            background-color: white;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            padding: 30px;
        }

        .page-header {
            margin-bottom: 30px;
            color: var(--text-color);
            position: relative;
            padding-bottom: 12px;
            font-weight: 600;
            display: flex;
            align-items: center;
        }

        .page-header:before {
            content: '';
            display: inline-block;
            width: 24px;
            height: 24px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%232563eb'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'/%3E%3C/svg%3E");
            margin-right: 10px;
        }

        .page-header:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: #e5e7eb;
        }

        .alert {
            padding: 14px 16px;
            border-radius: var(--border-radius);
            margin-bottom: 25px;
            font-weight: 500;
            display: flex;
            align-items: center;
        }

        .alert-success {
            background-color: rgba(16, 185, 129, 0.1);
            color: var(--success-color);
            border-left: 4px solid var(--success-color);
        }

        .alert-success:before {
            content: '';
            display: inline-block;
            width: 20px;
            height: 20px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2310b981'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7'/%3E%3C/svg%3E");
            margin-right: 10px;
        }

        .form-group {
            margin-bottom: 24px;
        }

        .form-label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #4b5563;
        }

        .form-control {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #d1d5db;
            border-radius: var(--border-radius);
            transition: border-color 0.3s, box-shadow 0.3s;
            font-size: 15px;
        }

        .form-control:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
        }

        .file-input-container {
            position: relative;
        }

        .file-input-label {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px 15px;
            background-color: #f9fafb;
            border: 2px dashed #d1d5db;
            border-radius: var(--border-radius);
            cursor: pointer;
            text-align: center;
            color: #6b7280;
            transition: all 0.3s;
        }

        .file-input-label:hover {
            background-color: #f3f4f6;
            border-color: var(--primary-color);
        }

        .file-input-label i {
            margin-right: 10px;
        }

        .file-input {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            cursor: pointer;
            width: 100%;
        }

        .file-name {
            margin-top: 10px;
            font-size: 14px;
            color: #6b7280;
            text-align: center;
        }

        .error-text {
            font-size: 14px;
            color: var(--error-color);
            margin-top: 5px;
            display: flex;
            align-items: center;
        }

        .error-text:before {
            content: '';
            display: inline-block;
            width: 16px;
            height: 16px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ef4444'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'/%3E%3C/svg%3E");
            margin-right: 5px;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: var(--primary-color);
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: var(--border-radius);
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            text-align: center;
            transition: all 0.3s ease;
        }

        .btn:hover {
            background-color: var(--secondary-color);
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .btn:active {
            transform: translateY(1px);
            box-shadow: none;
        }

        .btn-submit {
            width: 100%;
            margin-top: 15px;
            padding: 14px;
        }

        .btn-submit:before {
            content: '';
            display: inline-block;
            width: 20px;
            height: 20px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6'/%3E%3C/svg%3E");
            margin-right: 8px;
        }

        /* Car rental specific styling */
        .category-type-selector {
            display: flex;
            margin-bottom: 20px;
            border-radius: var(--border-radius);
            overflow: hidden;
            border: 1px solid #d1d5db;
        }

        .category-type-option {
            flex: 1;
            text-align: center;
            padding: 12px;
            background: #f9fafb;
            cursor: pointer;
            transition: all 0.2s;
            color: #6b7280;
            font-weight: 500;
            border-right: 1px solid #d1d5db;
        }

        .category-type-option:last-child {
            border-right: none;
        }

        .category-type-option.active {
            background: var(--primary-color);
            color: white;
        }

        .category-icon {
            margin-right: 8px;
            vertical-align: middle;
        }

        .dashboard-card {
            background: white;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            padding: 20px;
            margin-bottom: 20px;
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e5e7eb;
        }

        .card-title {
            font-size: 18px;
            font-weight: 600;
            color: var(--text-color);
        }

        .attribute-row {
            display: flex;
            margin-bottom: 15px;
        }

        .attribute-label {
            flex: 1;
            color: #6b7280;
        }

        .attribute-value {
            flex: 2;
        }

        .success-message {
            display: flex;
            align-items: center;
            background-color: #f0fdf4;
            border-left: 4px solid #22c55e;
            padding: 16px;
            margin-bottom: 24px;
            border-radius: 6px;
            color: #15803d;
            font-weight: 500;
        }

        .success-icon {
            width: 24px;
            height: 24px;
            margin-right: 12px;
            color: #22c55e;
        }

        @media (max-width: 768px) {
            .container {
                padding: 20px;
                margin: 20px 15px;
                max-width: none;
            }
            
            .attribute-row {
                flex-direction: column;
            }
            
            .category-type-option {
                padding: 10px 5px;
                font-size: 14px;
            }
        }
    </style>
<body>
    <div class="container">
        <h1 class="page-header">Add Vehicle Category</h1>
        
        @if(session('success'))
            <div class="success-message">
                <svg class="success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ session('success') }}</span>
            </div>
        @endif

        @if(session('error'))
        <div style=" background-color: rgba(16, 185, 129, 0.1); color: #b91810; padding: 14px; border-radius: 6px; margin-bottom: 25px; font-weight: 500;" class="alert alert-success">
            <h2> Adding Category Failed </h2>
        </div>
        @endif

        <div class="category-type-selector">
            

        <form action="{{ route('categorie.store') }}" method="POST" enctype="multipart/form-data" id="categorieForm">
            @csrf
            <div class="form-group">
                <label for="nom_categorie" class="form-label">Category Name</label>
                <input type="text" id="nom_categorie" name="nom_categorie" class="form-control" placeholder="e.g. Compact SUV, Economy Sedan" value="{{ old('nom_categorie') }}" required>
                @error('nom_categorie')
                    <div class="error-text">{{ $message }}</div>
                @enderror
            </div>

            <div class="form-group">
                <label for="image" class="form-label">Category Image</label>
                <div class="file-input-container">
                    <label for="image" class="file-input-label">
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>
                            <polyline points="7 9 12 4 17 9"/>
                            <line x1="12" y1="4" x2="12" y2="16"/>
                        </svg>
                        Upload a vehicle image or drag it here
                    </label>
                    <input type="file" id="image" name="image" accept="image/*" class="file-input">
                    <div class="file-name" id="file-name">No file selected</div>
                </div>
                @error('image')
                    <div class="error-text">{{ $message }}</div>
                @enderror
            </div>

            <div class="form-group">
                <label for="description" class="form-label">Description</label>
                <textarea id="description" name="description" class="form-control" rows="4" placeholder="Enter detailed information about this vehicle category">{{ old('description') }}</textarea>
                @error('description')
                    <div class="error-text">{{ $message }}</div>
                @enderror
            </div>

            <button type="submit" class="btn btn-submit">
                Add Vehicle Category
            </button>
        </form>
    </div>

    <script>
        // Display filename when a file is selected
        document.getElementById('image').addEventListener('change', function(e) {
            const fileName = e.target.files[0] ? e.target.files[0].name : 'No file selected';
            document.getElementById('file-name').textContent = fileName;
            
            // Change style to show selection
            if (e.target.files[0]) {
                document.querySelector('.file-input-label').style.borderColor = '#2563eb';
                document.querySelector('.file-input-label').style.color = '#2563eb';
            }
        });

        // Category type selector
        const categoryOptions = document.querySelectorAll('.category-type-option');
        categoryOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                categoryOptions.forEach(opt => opt.classList.remove('active'));
                // Add active class to clicked option
                this.classList.add('active');
            });
        });

        // Simple form validation
        document.getElementById('categorieForm').addEventListener('submit', function(e) {
            const categoryName = document.getElementById('nom_categorie').value.trim();
            
            if (!categoryName) {
                e.preventDefault();
                document.getElementById('nom_categorie').classList.add('error');
                // Create error message if not exists
                if (!document.querySelector('.nom_categorie-error')) {
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'error-text nom_categorie-error';
                    errorDiv.textContent = 'Category name is required';
                    document.getElementById('nom_categorie').parentNode.appendChild(errorDiv);
                }
            }
        });

        // Remove error styling on input
        document.getElementById('nom_categorie').addEventListener('input', function() {
            this.classList.remove('error');
            const errorElement = document.querySelector('.nom_categorie-error');
            if (errorElement) {
                errorElement.remove();
            }
        });
    </script>
</body>
@endsection