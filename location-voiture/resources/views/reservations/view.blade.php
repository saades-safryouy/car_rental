@extends('layouts.admin')
@section('title', 'Reservation Management')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <!-- Header Section with Background Gradient -->
        <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="flex items-center space-x-4 w-full md:w-auto mb-4 md:mb-0">
                    <div class="h-12 w-12 rounded-full bg-white flex items-center justify-center border-2 border-indigo-100 shadow-md">
                        <i class="fas fa-calendar-check text-indigo-600 text-xl"></i>
                    </div>
                    <h1 class="text-2xl font-bold text-white">Reservation Management</h1>
                </div>
              
            </div>
        </div>

        <!-- Filters and Search Section -->
        <div class="bg-gray-50 p-4 border-b border-gray-200">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <!-- Status Filter -->
                    <div>
                        <select id="statusFilter" class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm">
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="refused">Refused</option>
                        </select>
                    </div>
                    <!-- Date Range Filter -->
                    <div class="flex items-center space-x-2">
                        <input type="date" id="startDateFilter" class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm">
                        <span class="text-gray-500">to</span>
                        <input type="date" id="endDateFilter" class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm">
                    </div>
                </div>
                <!-- Search -->
                <div class="relative w-full md:w-64">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-search text-gray-400"></i>
                    </div>
                    <input type="text" id="searchInput" placeholder="Search client or car..."
                           class="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm">
                </div>
            </div>
        </div>

        <!-- Alert Messages -->
        <div class="px-6 pt-4">
            @if(session('success'))
                <div id="successAlert" class="bg-green-50 border-l-4 border-green-500 p-4 mb-4 rounded-md flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <i class="fas fa-check-circle text-green-500"></i>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm text-green-700">{{ session('success') }}</p>
                        </div>
                    </div>
                    <button type="button" onclick="document.getElementById('successAlert').remove()" class="text-green-500 hover:text-green-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            @endif

            @if(session('error'))
                <div id="errorAlert" class="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-md flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <i class="fas fa-exclamation-circle text-red-500"></i>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm text-red-700">{{ session('error') }}</p>
                        </div>
                    </div>
                    <button type="button" onclick="document.getElementById('errorAlert').remove()" class="text-red-500 hover:text-red-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            @endif
        </div>

        <!-- Reservations List -->
        <div class="p-6">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200 table-fixed">
                    <thead>
                        <tr class="bg-gray-50">
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matricule</th>

                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200" id="reservationTableBody">
                        @forelse($locations as $location)
                        <tr class="reservation-row hover:bg-gray-50" data-status="{{ $location->status }}">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                <a 
                                 class="hover:text-indigo-600">
                                    #{{ $location->id_location }}
                                </a>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div class="flex items-center">
                                    @if($location->voiture->imageFront)
                                        <img src="{{ asset('storage/' . $location->voiture->imageFront) }}" alt="{{ $location->voiture->modele }}" class="h-8 w-8 rounded-full mr-2 object-cover">
                                    @else
                                        <div class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                            <i class="fas fa-car text-gray-400"></i>
                                        </div>
                                    @endif
                                    <span>{{ $location->voiture->marque->nom_marque ?? 'Unknown' }} {{ $location->voiture->modele }}</span>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                
                                    <div>
                                        <div class="font-medium">{{ $location->voiture->immatriculation }} </div>
                                    </div>
                                
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div class="flex items-center">
                                    <div class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                                        <span class="text-indigo-600 font-medium text-xs">{{ strtoupper(substr($location->client->nom, 0, 1)) }}{{ strtoupper(substr($location->client->prenom, 0, 1)) }}</span>
                                    </div>
                                    <div>
                                        <div class="font-medium">{{ $location->client->nom }} {{ $location->client->prenom }}</div>
                                        <div class="text-xs text-gray-400">{{ $location->client->email }}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div>
                                    <div class="flex items-center">
                                        <i class="far fa-calendar-alt text-indigo-500 mr-2"></i>
                                        <span>{{ \Carbon\Carbon::parse($location->date_debut)->format('M d, Y') }}</span>
                                    </div>
                                    <div class="flex items-center mt-1">
                                        <i class="far fa-calendar-check text-indigo-500 mr-2"></i>
                                        <span>{{ \Carbon\Carbon::parse($location->date_fin)->format('M d, Y') }}</span>
                                    </div>
                                    <div class="text-xs text-gray-400 mt-1">
                                        {{ \Carbon\Carbon::parse($location->date_debut)->diffInDays(\Carbon\Carbon::parse($location->date_fin)) }} days
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                @if($location->status === 'Pending')
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                        <i class="fas fa-clock mr-1 mt-1"></i> Pending
                                    </span>
                                @elseif($location->status === 'Accepted')
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        <i class="fas fa-check-circle mr-1 mt-1"></i> Accepted
                                    </span>
                                @elseif($location->status === 'Refused')
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                        <i class="fas fa-times-circle mr-1 mt-1"></i> Refused
                                    </span>
                                @endif
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <span class="font-semibold">{{ number_format($location->montant_total, 2) }} €</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div class="flex items-center space-x-2">                                   
                                   
                                    @if($location->status === 'Pending')
                                        <!-- Accept Button -->
                                        <form action="{{ route('reservation.status.update', $location->id_location) }}" 
                                              method="POST" 
                                              class="inline-block">
                                            @csrf
                                            @method('PUT')
                                            <input type="hidden" name="status" value="Accepted">
                                            <button type="submit" 
                                                    class="text-green-600 hover:text-blue-800 font-medium">
                                            <i class="fas fa-check-circle"></i>
                                           </button>
                                        </form>
                                        
                                        <!-- Refuse Button -->
                                        <form action="{{ route('reservation.status.update', $location->id_location) }}" 
                                              method="POST" 
                                              class="inline-block">
                                            @csrf
                                            @method('PUT')
                                            <input type="hidden" name="status" value="Refused">
                                            <button type="submit" 
                                                    class="text-red-600 hover:text-blue-800 font-medium">
                                            <i class="fas fa-times-circle"></i>
                                            
                                           </button>
                                        </form>
                                    @endif
                                </div>
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="7" class="px-6 py-10 text-center text-gray-500">
                                <div class="flex flex-col items-center justify-center">
                                    <svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                    </svg>
                                    <h3 class="mt-2 text-sm font-medium text-gray-900">No reservations found</h3>
                                    <p class="mt-1 text-sm text-gray-500">No reservation requests have been made yet.</p>
                                </div>
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="mt-4">
                {{-- {{ $locations->links() }} --}}
            </div>
        </div>
    </div>
</div>

<!-- Accept Reservation Modal -->
<div id="acceptModal" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden flex items-center justify-center">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div class="bg-gradient-to-r from-green-500 to-green-600 p-4">
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold text-white">Accept Reservation</h2>
                <button type="button" onclick="closeModals()" class="text-white hover:text-gray-200 focus:outline-none">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
        
        <div class="p-6">
            <div class="mb-6">
                <p class="text-gray-700">Are you sure you want to accept this reservation? The client will be notified and the vehicle will be marked as unavailable for this period.</p>
            </div>
            
            <form id="acceptForm" action="{{ route('reservation.status.update',$location->voiture->id_voiture) }}" method="POST">
                @csrf
                @method('PUT')
                <input type="hidden" name="status" value="accepted">
                
                <!-- Additional options for acceptance -->
                <div class="mb-4">
                    <label for="prepayment_required" class="flex items-center">
                        <input type="checkbox" id="prepayment_required" name="prepayment_required" value="1" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <span class="ml-2 text-sm text-gray-700">Require prepayment (30%)</span>
                    </label>
                </div>
                
                <div class="mb-4">
                    <label for="acceptance_note" class="block text-sm font-medium text-gray-700 mb-1">Note to client (optional):</label>
                    <textarea id="acceptance_note" name="admin_note" rows="3" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
                </div>
                
                <div class="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                    <button type="button" onclick="closeModals()" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200">
                        Cancel
                    </button>
                    <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200">
                        Accept Reservation
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Refuse Reservation Modal -->
<div id="refuseModal" class="fixed inset-0 bg-black bg-opacity-50 z-40 hidden flex items-center justify-center">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div class="bg-gradient-to-r from-red-500 to-red-600 p-4">
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold text-white">Refuse Reservation</h2>
                <button type="button" onclick="closeModals()" class="text-white hover:text-gray-200 focus:outline-none">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
        
        <div class="p-6">
            <div class="mb-6">
                <p class="text-gray-700">Are you sure you want to refuse this reservation? Please provide a reason to inform the client.</p>
            </div>
            
            <form id="refuseForm" action="" method="POST">
                @csrf
                @method('PUT')
                <input type="hidden" name="status" value="refused">
                
                <div class="mb-4">
                    <label for="refusal_reason" class="block text-sm font-medium text-gray-700 mb-1">Reason for refusal:</label>
                    <select id="refusal_reason" name="refusal_reason" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        <option value="unavailable">Vehicle no longer available</option>
                        <option value="maintenance">Vehicle needs maintenance</option>
                        <option value="driver_requirements">Driver does not meet requirements</option>
                        <option value="payment_issues">Payment verification issues</option>
                        <option value="other">Other reason</option>
                    </select>
                </div>
                
                <div class="mb-4">
                    <label for="refusal_note" class="block text-sm font-medium text-gray-700 mb-1">Additional details:</label>
                    <textarea id="refusal_note" name="admin_note" rows="3" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
                </div>
                
                <div class="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                    <button type="button" onclick="closeModals()" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200">
                        Cancel
                    </button>
                    <button type="submit" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200">
                        Refuse Reservation
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

@section('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Auto-hide alerts after 5 seconds
    setTimeout(function() {
        const alerts = document.querySelectorAll('#successAlert, #errorAlert');
        alerts.forEach(alert => {
            if (alert) {
                alert.style.transition = 'opacity 1s';
                alert.style.opacity = '0';
                setTimeout(() => alert.remove(), 1000);
            }
        });
    }, 5000);

    // Filter functionality
    const statusFilter = document.getElementById('statusFilter');
    const startDateFilter = document.getElementById('startDateFilter');
    const endDateFilter = document.getElementById('endDateFilter');
    const searchInput = document.getElementById('searchInput');
    const rows = document.querySelectorAll('.reservation-row');

    function applyFilters() {
        const status = statusFilter.value;
        const startDate = startDateFilter.value ? new Date(startDateFilter.value) : null;
        const endDate = endDateFilter.value ? new Date(endDateFilter.value) : null;
        const searchTerm = searchInput.value.toLowerCase();

        rows.forEach(row => {
            let visible = true;
            
            // Status filter
            if (status !== 'all' && row.dataset.status !== status) {
                visible = false;
            }
            
            // Search filter
            if (searchTerm && !row.textContent.toLowerCase().includes(searchTerm)) {
                visible = false;
            }
            
            // TODO: Date filtering would require additional data attributes on rows
            
            row.style.display = visible ? '' : 'none';
        });
    }

    // Add event listeners
    if (statusFilter) statusFilter.addEventListener('change', applyFilters);
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (startDateFilter) startDateFilter.addEventListener('change', applyFilters);
    if (endDateFilter) endDateFilter.addEventListener('change', applyFilters);
});

// Modal functionality
function showAcceptModal(locationId) {
    const modal = document.getElementById('acceptModal');
    const form = document.getElementById('acceptForm');
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

function showRefuseModal(locationId) {
    const modal = document.getElementById('refuseModal');
    const form = document.getElementById('refuseForm');
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

function closeModals() {
    const modals = document.querySelectorAll('#acceptModal, #refuseModal');
    modals.forEach(modal => modal.classList.add('hidden'));
    document.body.classList.remove('overflow-hidden');
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('#acceptModal, #refuseModal');
    modals.forEach(modal => {
        if (event.target === modal) {
            closeModals();
        }
    });
});
</script>

<style>
/* Additional styles for better UI */
.pagination {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
}

.pagination li {
    margin: 0 0.25rem;
}

.pagination li a, .pagination li span {
    display: block;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid #e2e8f0;
    color: #4a5568;
}

.pagination li.active span {
    background-color: #4f46e5;
    border-color: #4f46e5;
    color: white;
}

.pagination li a:hover {
    background-color: #f7fafc;
}

/* Modal animations */
#acceptModal, #refuseModal {
    transition: opacity 0.3s ease-out;
}

#acceptModal.hidden, #refuseModal.hidden {
    opacity: 0;
    pointer-events: none;
}

#acceptModal > div, #refuseModal > div {
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
    transform: translateY(0);
    opacity: 1;
}

#acceptModal.hidden > div, #refuseModal.hidden > div {
    transform: translateY(20px);
    opacity: 0;
}

/* Table hover effect */
.reservation-row:hover {
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
}
</style>
@endsection
@endsection