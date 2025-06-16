# Admin Functionality Testing Guide

## Test Environment Setup
- Development server running on http://localhost:3000
- Mock API endpoints configured
- All dependencies installed

## 1. Admin Settings Page Testing

### 1.1 Settings Page Access
- [x] Navigate to `/admin/settings`
- [x] Verify page loads without errors
- [x] Check all tabs are present: School Info, Student ID, Academic, Notifications, Security, Data Management

### 1.2 School Information Settings
**Test Cases:**
- [ ] Load existing school information
- [ ] Update school name and save
- [ ] Upload school logo
- [ ] Update contact information
- [ ] Verify form validation

**API Calls to Test:**
```bash
# GET settings
curl -X GET http://localhost:3000/api/settings

# UPDATE school info
curl -X PUT http://localhost:3000/api/settings \
  -H "Content-Type: application/json" \
  -d '{"schoolInfo": {"name": "Updated School Name"}}'
```

### 1.3 Student ID Configuration
**Test Cases:**
- [ ] View default student ID pattern
- [ ] Change prefix from SMS to SCH
- [ ] Toggle year inclusion
- [ ] Change sequence length
- [ ] Test real-time preview updates
- [ ] Generate sample student IDs

**API Calls to Test:**
```bash
# Preview student ID with custom config
curl -X GET "http://localhost:3000/api/settings/student-id?prefix=SCH&includeYear=true&sequenceLength=4"

# Generate new student ID
curl -X POST http://localhost:3000/api/settings/student-id \
  -H "Content-Type: application/json" \
  -d '{"action": "generate"}'
```

### 1.4 Academic Settings
**Test Cases:**
- [ ] Set academic year dates
- [ ] Change term system (semester/trimester/quarterly)
- [ ] Update grading scale
- [ ] Add new grade levels
- [ ] Remove grade levels
- [ ] Add new subjects
- [ ] Remove subjects
- [ ] Update default class capacity

### 1.5 Notification Settings
**Test Cases:**
- [ ] Toggle email notifications
- [ ] Toggle SMS notifications
- [ ] Toggle push notifications
- [ ] Configure parent notification preferences
- [ ] Configure teacher notification preferences

### 1.6 Security Settings
**Test Cases:**
- [ ] Update password minimum length
- [ ] Toggle special character requirements
- [ ] Set session timeout
- [ ] Enable/disable 2FA
- [ ] Configure login attempt limits
- [ ] Set lockout duration

### 1.7 Data Management
**Test Cases:**
- [ ] Export settings
- [ ] Import settings
- [ ] Export student data
- [ ] Export grade reports
- [ ] View data retention policies
- [ ] Test system maintenance tools

## 2. Class Management Testing

### 2.1 Class List View
**Test Cases:**
- [ ] Navigate to `/admin/manage/academics/classes`
- [ ] Verify existing classes display
- [ ] Check class metrics (Total Students, Classes, Teachers, Subjects)
- [ ] Verify action buttons are present

**API Calls to Test:**
```bash
# Get all classes
curl -X GET http://localhost:3000/api/classes
```

### 2.2 Add New Class Workflow
**Test Cases:**
- [ ] Click "Create New Class / Arm" button
- [ ] Navigate to `/admin/manage/academics/classes/add`
- [ ] Complete Step 1: Basic Information
  - [ ] Enter class name
  - [ ] Select grade level
  - [ ] Select section
  - [ ] Add description
- [ ] Complete Step 2: Subject Assignment
  - [ ] Search for subjects
  - [ ] Select multiple subjects
  - [ ] Use quick select options
  - [ ] Add custom subject
- [ ] Complete Step 3: Teacher Assignment
  - [ ] Assign class teacher (optional)
  - [ ] Assign subject teachers
  - [ ] Verify teacher-subject matching
- [ ] Complete Step 4: Class Settings
  - [ ] Set class capacity
  - [ ] Assign room
  - [ ] Configure class status
- [ ] Complete Step 5: Review & Create
  - [ ] Review all information
  - [ ] Edit specific steps if needed
  - [ ] Submit class creation
  - [ ] Verify success message
  - [ ] Verify navigation back to class list

**API Calls to Test:**
```bash
# Create new class
curl -X POST http://localhost:3000/api/classes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Advanced Mathematics",
    "section": "A",
    "academicYear": "2025",
    "description": "Advanced math for grade 10",
    "capacity": 25,
    "teacherId": "1"
  }'
```

### 2.3 Class CRUD Operations
**Test Cases:**
- [ ] View individual class details
- [ ] Edit existing class
- [ ] Update class information
- [ ] Delete class (if implemented)
- [ ] Assign/remove students from class

**API Calls to Test:**
```bash
# Update class
curl -X PUT http://localhost:3000/api/classes/1 \
  -H "Content-Type: application/json" \
  -d '{"capacity": 35}'

# Delete class
curl -X DELETE http://localhost:3000/api/classes/1
```

## 3. Student Management Testing

### 3.1 Student Creation with Auto-Generated ID
**Test Cases:**
- [ ] Navigate to `/admin/manage/students/addnew`
- [ ] Verify auto-generated student ID appears
- [ ] Test regenerate student ID button
- [ ] Test copy student ID button
- [ ] Complete student form with all required fields
- [ ] Submit form and verify success

**API Integration:**
- [ ] Verify student ID generation API call
- [ ] Check ID format matches settings configuration
- [ ] Ensure IDs are unique

## 4. Navigation and User Experience

### 4.1 Sidebar Navigation
**Test Cases:**
- [ ] Verify all navigation links work
- [ ] Check active state highlighting
- [ ] Test mobile navigation
- [ ] Verify settings link points to `/admin/settings`

### 4.2 Breadcrumbs and Back Navigation
**Test Cases:**
- [ ] Test back button on class creation page
- [ ] Verify breadcrumb navigation
- [ ] Test cancel actions

### 4.3 User Feedback
**Test Cases:**
- [ ] Success toasts on form submissions
- [ ] Error handling for API failures
- [ ] Loading states during API calls
- [ ] Form validation messages

## 5. Integration Testing

### 5.1 Cross-Feature Integration
**Test Cases:**
- [ ] Create class with subjects defined in academic settings
- [ ] Generate student ID using configured pattern
- [ ] Verify settings changes reflect in other areas
- [ ] Test notification preferences in actual workflows

### 5.2 Error Handling
**Test Cases:**
- [ ] Test with backend unavailable
- [ ] Test with invalid API responses
- [ ] Test form validation edge cases
- [ ] Test network timeout scenarios

## 6. Performance Testing

### 6.1 Page Load Times
**Test Cases:**
- [ ] Measure settings page load time
- [ ] Measure class creation workflow performance
- [ ] Test with large datasets (many classes, subjects)

### 6.2 API Response Times
**Test Cases:**
- [ ] Measure API response times
- [ ] Test concurrent API calls
- [ ] Monitor memory usage during form interactions

## Testing Results Summary

### ✅ Completed Tests
- [x] API endpoints functionality (GET, POST, PUT, DELETE)
- [x] Mock data responses
- [x] Basic navigation structure
- [x] Component rendering

### 🔄 In Progress
- [ ] Frontend form submissions
- [ ] User interface interactions
- [ ] End-to-end workflows

### ❌ Failed Tests
- [ ] (To be documented as testing progresses)

### 📝 Issues Found
- [ ] (To be documented as testing progresses)

### 🔧 Fixes Applied
- [ ] (To be documented as fixes are implemented)

## Next Steps
1. Complete manual testing of all functionality
2. Document any issues found
3. Fix critical bugs
4. Verify all user stories are satisfied
5. Prepare for production deployment