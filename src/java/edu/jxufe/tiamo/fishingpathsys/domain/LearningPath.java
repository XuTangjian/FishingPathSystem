package edu.jxufe.tiamo.fishingpathsys.domain;

import javax.persistence.*;
import java.lang.annotation.Target;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "learning_path", schema = "FishingPathSystem")
public class LearningPath {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private short id;
    @Basic
    @Column(name = "name")
    private String name;
    @Basic
    @Column(name = "description")
    private String description;

    @ManyToOne(targetEntity = Staff.class)
    @JoinColumn(name = "staff_id", referencedColumnName = "id", nullable = false)
    private Staff staff;
    @ManyToOne(targetEntity = CourseCategory.class)
    @JoinColumn(name = "course_category_id", referencedColumnName = "id", nullable = false)
    private CourseCategory courseCategory;
    @OneToMany(targetEntity = LearningRecord.class, mappedBy = "learningPath",fetch = FetchType.LAZY)
    private List<LearningRecord> learningRecordList;

    public short getId() {
        return id;
    }

    public void setId(short id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Staff getStaff() {
        return staff;
    }

    public void setStaff(Staff staff) {
        this.staff = staff;
    }

    public List<LearningRecord> getLearningRecordList() {
        return learningRecordList;
    }

    public void setLearningRecordList(List<LearningRecord> learningRecordList) {
        this.learningRecordList = learningRecordList;
    }

    public CourseCategory getCourseCategory() {
        return courseCategory;
    }

    public void setCourseCategory(CourseCategory courseCategory) {
        this.courseCategory = courseCategory;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LearningPath that = (LearningPath) o;
        return id == that.id &&
                Objects.equals(name, that.name) &&
                Objects.equals(description, that.description) &&
                Objects.equals(staff, that.staff) &&
                Objects.equals(learningRecordList, that.learningRecordList) &&
                Objects.equals(courseCategory, that.courseCategory);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, name, description, staff, learningRecordList, courseCategory);
    }
}
