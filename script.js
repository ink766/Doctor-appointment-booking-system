// Sample data
const doctors = [
    { id: 1, name: 'Dr. Smith', totalSlots: 10, availableSlots: 6, bookedSlots: [ '10:00', '11:00' ] },
    { id: 2, name: 'Dr. Johnson', totalSlots: 8, availableSlots: 4, bookedSlots: [ '09:00', '14:00' ] },
    { id: 3, name: 'Dr. Haris', totalSlots:6, availableSlots:3,bookedSlots: [ '7:00', '10:30'] }
];

let appointments = [];
const doctorSelect = document.getElementById('doctorSelect');
const doctorsList = document.getElementById('doctorsList');
const appointmentsList = document.getElementById('appointmentsList');

document.addEventListener('DOMContentLoaded', () => {
    populateDoctors();
    populateDoctorCards();
});

document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    bookAppointment();
});

document.getElementById('cancellationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    cancelAppointment();
});

document.getElementById('viewAppointmentsBtn').addEventListener('click', () => {
    viewAppointments();
});

function populateDoctors() {
    doctors.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor.id;
        option.textContent = doctor.name;
        doctorSelect.appendChild(option);
    });
}

function populateDoctorCards() {
    doctors.forEach(doctor => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${doctor.name}</h5>
                    <p class="card-text">
                        Total Slots: ${doctor.totalSlots} <br>
                        Available Slots: ${doctor.availableSlots} <br>
                        Booked Slots: ${doctor.bookedSlots.join(', ')}
                    </p>
                </div>
            </div>
        `;
        doctorsList.appendChild(card);
    });
}

function bookAppointment() {
    const patientName = document.getElementById('patientName').value;
    const doctorId = parseInt(doctorSelect.value);
    const appointmentDate = document.getElementById('appointmentDate').value;
    const appointmentTime = document.getElementById('appointmentTime').value;

    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) return alert('Doctor not found');

    if (doctor.availableSlots > 0 && !doctor.bookedSlots.includes(appointmentTime)) {
        const appointmentId = new Date().getTime(); // Unique ID
        appointments.push({ id: appointmentId, patientName, doctorName: doctor.name, date: appointmentDate, time: appointmentTime });
        doctor.bookedSlots.push(appointmentTime);
        doctor.availableSlots--;
        alert('Appointment booked successfully');
        viewAppointments();
        populateDoctorCards(); // Update doctor cards
    } else {
        alert('Selected time slot is not available');
    }
}

function cancelAppointment() {
    const appointmentId = parseInt(document.getElementById('appointmentId').value);
    const appointmentIndex = appointments.findIndex(a => a.id === appointmentId);
    
    if (appointmentIndex !== -1) {
        const appointment = appointments[appointmentIndex];
        const doctor = doctors.find(d => d.name === appointment.doctorName);
        
        if (doctor) {
            doctor.bookedSlots = doctor.bookedSlots.filter(slot => slot !== appointment.time);
            doctor.availableSlots++;
        }
        
        appointments.splice(appointmentIndex, 1);
        alert('Appointment canceled successfully');
        viewAppointments();
        populateDoctorCards(); // Update doctor cards
    } else {
        alert('Appointment not found');
    }
}

function viewAppointments() {
    appointmentsList.innerHTML = '';
    appointments.forEach(appointment => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = `ID: ${appointment.id} | Patient: ${appointment.patientName} | Doctor: ${appointment.doctorName} | Date: ${appointment.date} | Time: ${appointment.time}`;
        appointmentsList.appendChild(listItem);
    });
}
