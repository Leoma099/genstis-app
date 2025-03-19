<template>
  <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Feedback</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="">
            <div class="form-group">
              <label for="">Ticket Order:</label>
              <input type="text" class="form-control form-control-sm">
            </div>
            <div class="form-group">
              <label for="">Comment:</label>
              <input type="text" class="form-control form-control-sm">
            </div>
            <div class="form-group">
              <label for="">Ticket Order:</label>
              <select class="form-control form-control-sm">
                <option value="1">Positive</option>
                <option value="2">Neutral</option>
                <option value="3">Negative</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
    </div>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>